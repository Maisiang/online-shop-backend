# 購物網站-後端

## Demo
網站入口：https://maisiang.github.io/online-shop-frontend/  
[( 前端專案 repository )](https://github.com/Maisiang/online-shop-frontend)

## 專案簡介
### 雲端託管
- [Render](https://render.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/)
- [Imgur](https://imgur.com/)

### 主要技術
- Node.js
- express
- http
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-session](https://www.npmjs.com/package/express-session)
- [multer](https://www.npmjs.com/package/multer)
- [WebSocket](https://www.npmjs.com/package/ws)
- [MongoDB](https://api.mongodb.com/)
- [mongoose](https://mongoosejs.com/docs/api.html)
- [connect-redis](https://www.npmjs.com/package/connect-redis)
- [Imgur](https://www.npmjs.com/package/imgur)

## 環境變數
### CORS
- ORIGIN= 設定請求的網站來源
### MongoDB
- MONGODB_URI
### Redis
- REDIS_HOST
- REDIS_PORT
- REDIS_PASS
### Imgur
- CLIENT_ID
- CLIENT_SECRET
- REFRESH_TOKEN

## API
<table>
    <thead>
        <tr>
            <td>base route</td>
            <td>routes</td>
            <td>HTTP method</td>
            <td>feature</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="15">/api</td>
            <td>/product</td>
            <td>GET</td>
            <td>取得商品資訊</td>
        </tr>
        <tr>
            <td>/cart</td>
            <td>GET</td>
            <td>取得購物車清單</td>
        </tr>
        <tr>
            <td>/cart/:product_id</td>
            <td>POST</td>
            <td>新增購物車商品</td>
        </tr>
        <tr>
            <td>/cart/:product_id</td>
            <td>DELETE</td>
            <td>移除購物車商品</td>
        </tr>
        <tr>
            <td>/user</td>
            <td>GET</td>
            <td>取得用戶資訊</td>
        </tr>
        <tr>
            <td>/user/register</td>
            <td>POST</td>
            <td>會員註冊</td>
        </tr>
        <tr>
            <td>/user/password</td>
            <td>PUT</td>
            <td>更新密碼</td>
        </tr>
        <tr>
            <td>/user/avatar</td>
            <td>PUT</td>
            <td>更新頭像</td>
        </tr>
        <tr>
            <td>/user/login</td>
            <td>POST</td>
            <td>會員登入</td>
        </tr>
        <tr>
            <td>/user/logout</td>
            <td>POST</td>
            <td>會員登出</td>
        </tr>
        <tr>
            <td>/user/loginStatus</td>
            <td>GET</td>
            <td>取得登入狀態</td>
        </tr>
        <tr>
            <td>/transaction</td>
            <td>GET</td>
            <td>取得交易紀錄</td>
        </tr>
        <tr>
            <td>/transaction</td>
            <td>POST</td>
            <td>新增交易紀錄</td>
        </tr>
    </tbody>
</table>

## 聲明
本作品的圖片及內容皆為個人學習使用，無任何商業用途！
