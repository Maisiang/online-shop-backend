const crypto = require('crypto');

exports.hashPassword = (password) =>{
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
exports.validateUsername = (string) => {
    const pattern = new RegExp("^[a-zA-Z0-9]{6,12}$");
    if (pattern.test(string))   return true;
    else  return false;
}

exports.validatePassword = (string) => {
    const pattern = new RegExp("^[a-zA-Z0-9]{6,12}$");
    if (pattern.test(string))   return true;
    else  return false;
}

exports.validateEmail = (string) => {
    const pattern = new RegExp("^[a-zA-Z0-9]+((-[a-zA-Z0-9]+)|(\.[a-zA-Z0-9]+))*\@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z]+$");
    if (pattern.test(string))   return true;
    else  return false;
}

exports.validateTel = (string) => {
    const pattern = new RegExp("^[0-9]{10}$");
    if (pattern.test(string))   return true;
    else  return false;
}