const md5 = require('md5');

function getEncryptedData(data) {
    return md5(data);
}

module.exports = { getEncryptedData };
