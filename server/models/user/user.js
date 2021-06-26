const jwt = require('jsonwebtoken');
const { getResponseObject, encryptData, writeFile, compareData } = require('../../util');
const userData = require('./user.json') || [];
const { v4: uuid } = require('uuid');

class User {
    name;
    email;
    password;

    constructor(object = {}) {
        this.name = object.name;
        this.email = object.email;
        this.password = object.password;
    }

    getUser(options = {}) {
        const users = userData.map(user => { delete user.password; return user; });
        if (!options.where) return getResponseObject(200, "User Fetched successfully", users);

        const resp = users.filter(user => Object.keys(options.where).every(key => user[key] === options.where[key]));

        return getResponseObject(200, "User Fetched successfully", resp);
    }

    async saveUser() {
        try {
            const user = userData.filter(user => this.email === user.email);

            if (user && user.length > 0) return getResponseObject(400, "This email is already taken. Please choose a diffrent one");
            const encryptedPwd = await encryptData(this.password);

            userData.push({
                name: this.name,
                email: this.email,
                password: encryptedPwd,
                id: uuid()
            });

            writeFile('./models/user/user.json', JSON.stringify(userData));
            return getResponseObject(200, "User saved succesfully");
        } catch (error) {
            console.log(error);
            return getResponseObject(500, "Internal Server Error");
        }
    }

    async signin() {
        const user = userData.filter(user => this.email === user.email);

        if (!user || user.length === 0) return getResponseObject(400, "Invalid Credentials");
        const checkPwd = await compareData(this.password, user[0].password);
        if (!checkPwd) return getResponseObject(400, "Invalid Credentials");

        // Generate an access token
        const accessToken = jwt.sign({ email: this.email, uid: user[0].id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT
        });

        return getResponseObject(200, "Sign in successfull", { accessToken: accessToken, uid: user[0].id, name: user[0].name });
    }
}

module.exports.User = User;