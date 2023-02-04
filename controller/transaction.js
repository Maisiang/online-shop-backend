const transaction = require('../models/transaction');
const product = require('../models/product');
const cart = require('../models/cart');
const utils = require('./utils');

const { ObjectId } = require('mongodb');

// 取得交易紀錄
exports.getTransaction = async(request,response)=>{
    console.log('查詢交易紀錄 ',request.session.user.username)
    // 搜尋該用戶所有交易紀錄
    let query = await transaction.find({username: request.session.user.username}).sort({orderDate:-1});
    response.json(query);
}

// 新增交易紀錄
exports.addTransaction = async(request,response)=>{
    console.log('用戶送出訂單：',request.body)
    // 驗證訂單資訊是否符合格式
    if(!utils.validateEmail(request.body.orderInfo.email)   ||
       !utils.validateTel(request.body.orderInfo.phoneNum)  ||
       request.body.orderInfo.name.length>10    ||
       request.body.orderInfo.address.length>50 ||
       request.body.orderInfo.note.length>50){
        response.send({
            isSuccess: false,
            message: '輸入的資料有誤...'
        })
        return;
    }
    // 到資料庫用id尋找price計算總金額
    let query;
    let total = 0;
    for(let i=0 ; i<request.body.productList.length ; i++){
        query = await product.find({ _id:ObjectId(request.body.productList[i]._id )})
        console.log(query)
        total = total + query[0].price * request.body.productList[i].num;
    }
    // 插入訂單資訊到資料庫
    const taipeiDate = new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});
    let insertTransaction = new transaction({
        username    : request.session.user.username,
        orderInfo   : request.body.orderInfo,
        productList : request.body.productList,
        total       : total,
        orderDate   : taipeiDate,
        status      : "pending"
    })
    await insertTransaction.save((error,results)=>{
        if(error){
            console.log(error);
            response.send({
                isSuccess: false,
                message: 'Server Error 訂單取消...'
            });
            return;
        }
    })
    // 移除用戶購物車所有商品id
    query = await cart.updateOne(
        {username:request.session.user.username},
        {$set:{product_id:[]}}
    )
    // 結果傳送到客戶端
    console.log('已送出訂單！');
    response.send({
        isSuccess: true,
        message: '已送出訂單！'
    });

}

