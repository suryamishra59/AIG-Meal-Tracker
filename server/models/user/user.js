const jwt = require('jsonwebtoken');
const { getResponseObject } = require('../../util');
const userData = require('./user.json');

class User {
    name;
    email;
    password;

    constructor(object = {}) {
        this.name = object.name;
        this.email = object.email;
        this.password = object.password;
        console.log('User model initialized');
    }

    getUser(options = {}) {
        const users = userData.map(user => { delete user.password; return user; });
        if (!options.where) return getResponseObject(200, "User Fetched successfully", users);

        const resp = users.filter(user => {
            return Object.keys(options.where).every(condition => user[condition] === options.where[condition]);
        });

        return getResponseObject(200, "User Fetched successfully", resp);
    }

    saveUser(payload) {
        
    }

    signin() {
        const user = userData.filter(user => this.email === user.email && this.password === user.password);

        if (!user || user.length === 0) return getResponseObject(400, "Invalid Credentials");

        // Generate an access token
        const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

        return getResponseObject(200, "Sign in successfull", accessToken);
    }
}

module.exports.User = User;