const avatar = require('../models/avatar');

// 設定imgur
const { ImgurClient } = require('imgur');
const client = new ImgurClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
});

// 更新頭像     -   需錯誤處理
exports.updateAvatar = async(request,response)=>{
    console.log(request.session.user.username,' 用戶更新頭像' , request.file);
    // 判斷資料庫是否已經存在頭像
    let query = await avatar.find({ name: request.session.user.username });
    // 刪除imgur頭像
    if(query.length!=0) client.deleteImage(query[0].deletehash);
        
    // 新增imgur頭像
    const resFromImgur = await client.upload({
        image       : request.file.buffer.toString('base64'),
        type        : 'base64',
        title       : request.session.user.username,
        album       : process.env.ALBUM_ID_AVATAR
    });
    // 新增或更新資料
    await avatar.updateOne(
        { name: request.session.user.username },
        { $set: 
            { 
                id          : resFromImgur.data.id, 
                deletehash  : resFromImgur.data.deletehash,
                link        : resFromImgur.data.link
            }
        },
        { upsert: true }
     )
     // 修改session的avatar
     request.session.user.avatar=resFromImgur.data.link;
     // 傳送訊息給用戶
     response.send({
        message: "更新頭像成功"
    });
}
