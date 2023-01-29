//const mongoose = require('mongoose');
const product = require('../models/product');

const menu = ['mouse','keyboard','laptop','speaker'];
exports.getProduct = async(request,response)=>{
    console.log("搜尋商品：",request.query.name);
    // 找到跟關鍵字相關的產品
    let query;
    // 不需要排序
    if(request.query.sortStr.length===0 || request.query.sortNum === '0'){
        if(menu.indexOf(request.query.name)!=-1)
            query = await product.find({ category: request.query.name });
        else
            query = await product.find({ name:{$regex: request.query.name} });
    }
    // 需要排序
    else if(request.query.sortNum === '1' || request.query.sortNum ==='-1'){
        if(menu.indexOf(request.query.name)!=-1)
            query = await product.find({ category: request.query.name }).sort({[request.query.sortStr]:request.query.sortNum});
        else
            query = await product.find({ name:{$regex: request.query.name} }).sort({[request.query.sortStr]:request.query.sortNum});
    }
    // 發送到客戶端
    response.json(query);
}



