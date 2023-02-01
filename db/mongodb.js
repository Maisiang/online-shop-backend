const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_LOCAL;

mongoose.set('strictQuery', true);

exports.mongoose = mongoose
exports.connect = () => {
	// 連接到資料庫
	mongoose.connect(mongoDB, ()=>{
        console.log("連接到 ",mongoDB);
    });
	return mongoose
}