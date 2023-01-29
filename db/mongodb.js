const mongoose = require('mongoose');

const username = 'maisiangg001';
const password = 'N1MFf1WSZ92JeFNZ';
const dbName = 'itdove';
const mongoDB = 'mongodb+srv://' + username + ':' + password + '@itdove.qqcyunq.mongodb.net/' + dbName +'?retryWrites=true&w=majority';
//const mongoDB = 'mongodb://127.0.0.1:27017/dove';

mongoose.set('strictQuery', true);
// mongoose
exports.mongoose = mongoose

// connect
exports.connect = () => {
	// 連接到資料庫
	mongoose.connect(mongoDB, ()=>{
        console.log("連接到 ",mongoDB);
    });
	return mongoose
}