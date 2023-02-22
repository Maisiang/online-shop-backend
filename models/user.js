const { mongoose } = require('../lib/mongodb.js');

const userSchema = new mongoose.Schema(
    {
        username:   { type: String, required: true, unique: true},
        password:   { type: String, required: true},
        email:      { type: String, required: true, unique: true},
        avatar:{
            id          : { type: String },
            deletehash  : { type: String },
            link        : { type: String }
        },
        registrationDate: { type: String, required: true}
    },
    {
        // 指定集合，否則預設自動在後面加 's'
        collection:'user'
    }
);

module.exports = mongoose.model('user', userSchema);