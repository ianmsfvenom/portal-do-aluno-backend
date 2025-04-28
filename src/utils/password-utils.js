const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS || 12;

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    encryptPassword,
    comparePassword
};