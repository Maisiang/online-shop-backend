# 購物網站-後端

## Demo
網站入口：https://maisiang.github.io/online-shop-frontend/  
[( 前端專案 repository )](https://github.com/Maisiang/online-shop-frontend)

## 專案簡介
### 雲端託管
- [Render](https://render.com/)  
  部署API Server。
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)  
  MongoDB雲端資料庫服務，儲存用戶、購物車、訂單等資料。
- [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/)  
  Redis 記憶體資料庫服務的雲端平台，用來儲存 session 資料。
- [Imgur](https://imgur.com/)  
  免費的圖片儲存空間，用來管理用戶頭像。

### 主要技術
- Node.js
- [express](https://expressjs.com/zh-tw/)  
  Node.js的web應用程式開發框架，可以快速建立web應用程式，並且提供Router、Middleware。
- http  
  建立和啟動一個HTTP伺服器，發送和結束HTTP請求，監聽HTTP伺服器事件。
- [cors](https://www.npmjs.com/package/cors)  
  透過CORS機制允許網站跨域請求，並設定 Credentials 允許攜帶認證資訊(Cookie)。
- [dotenv](https://www.npmjs.com/package/dotenv)  
  用於將環境變數從 .env 文件中載入到 process.env 對象中
- [express-session](https://www.npmjs.com/package/express-session)  
  Express middleware，用來建立和管理用戶 Session。
  - Session ID：辨識用戶，以 Cookie 方式儲存在客戶端。
  - secret：加密 session ID 的 key，我使用 64bytes 的亂數字串。
  - proxy：在Render部署應用會生成反向代理伺服器來處理請求，因此使用 session 時需要設定代理。
  - store：設定將 session 儲存到 Redis 資料庫。
- [multer](https://www.npmjs.com/package/multer)  
  Node.js middleware，處理 multipart/form-data 類型表單資料，對接前後端用戶頭像和註冊表單。
- [Imgur](https://www.npmjs.com/package/imgur)  
  整合Imgurl API，上傳用戶頭像功能。
- [mongoose](https://mongoosejs.com/docs/api.html)  
  Node.js MongoDB ODM套件，基於Schema的資料模型設計方式，簡化資料庫操作和管理，並
  透過驗證模型，保證資料正確和一致性。
- [crypto](https://nodejs.org/api/crypto.html)  
  提供各種加密、Hash方法，用來加密用戶密碼和重要資料。
- [connect-redis](https://www.npmjs.com/package/connect-redis)  
- [WebSocket](https://www.npmjs.com/package/ws)  



## 環境變數
### CORS
- ORIGIN = 設定請求的網站來源
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
- ALBUM_ID_AVATAR = 在Imgur設定的avatar相簿ID
- UNKNOWN_IMG = 訪客頭像URL
- PIGEON_IMG = 用戶預設頭像URL

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
