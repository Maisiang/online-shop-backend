const { mongoose } = require('../db/mongodb.js');

const avatarSchema = new mongoose.Schema(
    {
        name:       { type: String, required: true},
        id:         { type: String, required: true},
        deletehash: { type: String, required: true},
        link:       { type: String, required: true},
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'avatar'
    }
);

module.exports = mongoose.model('avatar', avatarSchema);