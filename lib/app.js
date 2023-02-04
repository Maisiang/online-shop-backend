// 引入相關模組
const express = require('express');
const app = express();
const createError = require('http-errors');
const logger = require('morgan');

const cors    = require('cors');
const session = require('express-session')
const Redis   = require('ioredis');
const crypto = require('crypto');

// 載入環境變數
require('dotenv').config();

// 設置允許跨域請求
console.log('CORS: ',process.env.ORIGIN)
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

// 連線到資料庫
const mongodb = require('./mongodb');
mongodb.connect();

// 連線到Redis
const redisStore = require("connect-redis")(session);
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
});

// 配置session
const sessionParser = session({
  name: 'iTDove',
  secret: crypto.randomBytes(64).toString(), // 64 bytes 亂數字串
  resave: false,
  saveUninitialized: true,
  store:new redisStore({client: redis}),
  proxy: true,
})
app.use(sessionParser);

// 其餘配置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 設置路由
const apiRouter = require('../routes/api');
app.use('/api', apiRouter);

// 捕獲 404 並轉送到 Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  console.log(err.status||500);
  console.log(req.app.get('env') === 'development' ? err : {})
  res.send(err.message);
});

module.exports = {
  app,
  sessionParser,
};
