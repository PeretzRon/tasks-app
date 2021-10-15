const crypto = require("crypto");

const ivHex = Buffer.alloc(16, process.env.CRYPTO_AES_INIT_VECTOR, 'hex');
const algorithm = "aes-256-cbc";

/**
 * encrypt data in AES256-cbc encryption
 * @param {string} data
 * @return {string} the encrypted data
 */
const encrypt = (data) => {
    const cipher = crypto.createCipheriv(algorithm, process.env.CRYPTO_AES_PRIVATE_KEY, ivHex);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
};

/**
 *  decrypt data in AES256-cbc encryption
 * @param {string} encryptedData
 * @return {string} the decrypted data
 */
const decrypt = (encryptedData) => {
    try {
        const myKey = crypto.createDecipheriv(algorithm, process.env.CRYPTO_AES_PRIVATE_KEY, ivHex);
        let decryptData = myKey.update(encryptedData, 'hex', 'utf8');
        decryptData += myKey.final('utf8');
        return decryptData;
    } catch (error) {
        console.log(error.message);
        return '';
    }

};

module.exports = {
    encrypt,
    decrypt
};
