const user = require('../models/user');
const cart = require('../models/cart');
const avatar = require('../models/avatar');
const utils = require('./utils');

// 取得用戶資料
exports.getUserInfo = async(request,response)=>{
    // 搜尋用戶名是否存在
    let query = await user.find({ username: request.session.user.username });
    // 傳送給用戶
    if(query.length!=0){
        response.send({
            username: query[0].username,
            email   : query[0].email,
            avatar  : request.session.user.avatar,
            registrationDate: query[0].registrationDate
        });
    }
}

// 用戶註冊
exports.register = async(request,response)=>{
    console.log('用戶註冊：',request.body.username)
    // 驗證欄位是否符合規則
    if(!utils.validateUsername(request.body.username)||
       !utils.validatePassword(request.body.password)||
       !utils.validateEmail(request.body.email)){
        response.send({
            isRegister: false,
            message: '輸入的資料有誤...'
        })
        return;
    }
    // 判斷 username或email 是否有重複的
    let query = await user.find({
        $or:[
            { username: request.body.username },
            { email: request.body.email }
        ]
    })
    if(query.length!=0){
        response.send({
            isRegister:false,
            message:'帳號或信箱存在！！'
        });
        return;
    }

    // 新增到資料庫
    const date = new Date().toISOString().slice(0,10);
    // 在user集合新增帳號

    let addUser = new user({
        username: request.body.username,
        password: utils.hashPassword(request.body.password),
        email   : request.body.email,
        registrationDate: date
    })
    addUser.save((error,results)=>{
        if(error) console.log(error);
        console.log('新增用戶',results._id);
    })
    // 在cart集合新增購物車
    let addCart = new cart({
        username: request.body.username,
        product_id:[]
    })
    addCart.save((error,results)=>{
        if(error) console.log(error);
        console.log('初始化用戶購物車',results._id);
    })
    // 回傳給客戶端註冊完畢資訊
    console.log('帳號註冊成功！');
    response.send({
        isRegister:true,
        message:'帳號註冊成功！'
    });
}

// 用戶更新密碼
exports.updatePassword = async(request,response)=>{
    console.log(request.session.user.username ,'用戶更新密碼\n');
    // 當舊密碼正確、新密碼兩次輸入一致
    let oldHashPwd = utils.hashPassword(request.body.passwordList.oldPwd);
    if((request.session.user.password === oldHashPwd)&&
       (request.body.passwordList.newPwd === request.body.passwordList.reNewPwd)&&
        utils.validatePassword(request.body.passwordList.newPwd)){
        let newHashPwd = utils.hashPassword(request.body.passwordList.newPwd);
        await user.updateOne(
            { username: request.session.user.username },
            { $set: { password: newHashPwd } }
        );
        request.session.user.password = newHashPwd;
        response.send({
            isSuccess: true,
            message:'密碼變更成功！'
        });
    }
    else{
        response.send({
            isSuccess: false,
            message:'輸入的密碼有誤，請重新輸入...'
        });
    }
}


/* Session */

// 用戶登入
exports.login = async(request,response)=>{
    console.log('用戶登入：',request.body.username);
    // 搜尋用戶名和密碼是否一樣(注意SQLi)
    let query = await user.find({
        username: request.body.username,
        password: utils.hashPassword(request.body.password)
    });
    // 用戶不存在
    if(query.length === 0){
        console.log('登入失敗');
        // 傳送資訊到客戶端
        response.send({
          isLogin:false,
          message:'帳號或密碼錯誤！'
        });
        return;
    }

    // 用戶存在
    console.log('登入成功！')
    let queryAvatar = await avatar.find({ name: request.body.username });
    let avatarTemp = process.env.PIGEON_IMG;
    if(queryAvatar.length!=0){
        avatarTemp = queryAvatar[0].link;
    }
    // Session 儲存用戶資訊
    request.session.user = {
        username: query[0].username,
        password: query[0].password,
        avatar: avatarTemp
    };
    // 傳送資訊到客戶端 (不包含密碼)
    response.send({
        isLogin:true,
        message: '登入成功！',
        username: query[0].username,
    });
    
}

// 用戶登出
exports.logout = async(request,response)=>{
    request.session.destroy();
    response.send({
        message:'登出成功！'
    })
}

// 維持用戶登入狀態
exports.isLogin = async(request,response)=>{
    response.send({
        isLogin:true,
        userInfo: {
            username:request.session.user.username
        },
    });
}



