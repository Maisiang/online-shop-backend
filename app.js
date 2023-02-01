// Express
var express = require('express');
var app = express();

// 引入相關模組
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入相關模組
const cors    = require('cors');
const session = require('express-session')
const Redis   = require('ioredis');

// 載入環境變數
require('dotenv').config();

// 設置允許跨域請求
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

// 連線到資料庫
const mongodb = require('./db/mongodb');
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
  secret: 'DoveSecret', // 建議 128 bytes 亂數字串
  resave: false,
  saveUninitialized: true,
  //store:new redisStore({client: redis})
  // cookie: {sameSite: 'strict',}
})
app.use(sessionParser);

// 其餘配置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 所有路由
const indexRouter = require('./routes/api');
const usersRouter = require('./routes/file');
app.use('/api', indexRouter);
app.use('/file', usersRouter);


// 捕獲 404 並轉送到 Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  //console.log(err.stack);
  console.log(err.status||500);
  console.log(req.app.get('env') === 'development' ? err : {})
  res.send(err.message);
});

module.exports = {
  app,
  sessionParser,
};
