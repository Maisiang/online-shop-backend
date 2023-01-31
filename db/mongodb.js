const mongoose = require('mongoose');

/*
const mongoDB = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
				'@itdove.qqcyunq.mongodb.net/' + process.env.DB_NAME +
				'?retryWrites=true&w=majority';
*/
const mongoDB = 'mongodb://127.0.0.1:27017/dove';


mongoose.set('strictQuery', true);

exports.mongoose = mongoose
exports.connect = () => {
	// 連接到資料庫
	mongoose.connect(mongoDB, ()=>{
        console.log("連接到 ",mongoDB);
    });
	return mongoose
}