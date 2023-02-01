const chat = require('../models/chat');


// 讀取聊天室內容
exports.getChat = async()=>{
    // 按照id新到舊，取得前50筆
    return await chat.find().limit(50).sort({_id:-1});
}

// 新增聊天室內容
exports.addChat = (sendData)=>{
    let tmp = Object.assign({},sendData);
    if(tmp.avatar === process.env.UNKNOWN_IMG)
        tmp.username= tmp.username + ' ';
    // 插入聊天訊息到資料庫
    let insertChat = new chat(tmp);
    insertChat.save((error,results)=>{
        if(error) console.log(error);
    })
}