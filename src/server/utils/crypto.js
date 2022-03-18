const bcrypt = require("bcrypt");

const encryptString = async (string) => bcrypt.hash(string, 10);

const comparePasswords = async (plain, hashed) => bcrypt.compare(plain, hashed);

module.exports = { encryptString, comparePasswords };
