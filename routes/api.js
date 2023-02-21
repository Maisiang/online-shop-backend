const express = require('express');
const router = express.Router();

// 所有路由
const user = require('../controller/user');
const cart = require('../controller/cart');
const product = require('../controller/product');
const transaction = require('../controller/transaction');
const avatar = require('../controller/avatar');

// 配置multer - 解析 multipart/form-data
const multer = require('multer');

// 解析form表單資料
const parseForm = multer();

// 不指定dest，預設以buffer寫入記憶體
const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
      }
      else{
        cb(null, false);
        return cb(new Error('Allowed only .jpg and .jpeg'));
      }
  }
})

// 檢查用戶是否登入
const requireLogin = (request,response,next) => {
  if (request.session.user === undefined ){
    if(request.path === '/user/loginStatus' && request.method === 'GET')
      response.send({isLogin:false});
    else
      response.status(401).send('Unauthorized');
  }
  else{
    console.log('登入: true')
    next();
  }
};

// 商品
router.get('/product', product.getProduct); //取得商品

// 購物車
router.get('/cart'                , requireLogin , cart.getCart);    // 取得購物車
router.post('/cart/:product_id'   , requireLogin , cart.addCart);    // 新增購物車商品
router.delete('/cart/:product_id' , requireLogin , cart.deleteCart); // 移除購物車商品

// 用戶
router.get('/user'          , requireLogin , user.getUserInfo);             // 取得用戶資訊
router.post('/user/register', parseForm.array(), user.register);            // 新增用戶
router.put('/user/password' , requireLogin , user.updatePassword);                         // 更新密碼 
router.put('/user/avatar'   , requireLogin , upload.single("avatar"), avatar.updateAvatar);// 更新頭像

// 用戶 - Session
router.post('/user/login'       , user.login);  // 用戶登入
router.post('/user/logout'      , user.logout); // 用戶登出
router.get('/user/loginStatus'  , requireLogin  , user.isLogin); // 取得登入狀態


// 交易紀錄
router.get('/transaction'  , requireLogin , transaction.getTransaction);  // 取得交易紀錄
router.post('/transaction' , requireLogin , transaction.addTransaction);  // 新增交易紀錄



/* GET index listing. */
router.get('/', function(req, res, next) {
  res.send('API router')
});


module.exports = router;
