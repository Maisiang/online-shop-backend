const { mongoose } = require('../lib/mongodb.js');

const userSchema = new mongoose.Schema(
    {
        username:   { type: String, required: true},
        password:   { type: String, required: true},
        email:      { type: String, required: true},
        registrationDate: { type: String, required: true}
    },
    {
        // 必須指定集合，否則預設自動在後面加 's'
        collection:'user'
    }
);

module.exports = mongoose.model('user', userSchema);