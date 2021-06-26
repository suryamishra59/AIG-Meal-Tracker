const { getExpressResponse } = require('../util');
const { User } = require('../models');
const { response } = require('express');

module.exports = (app) => {
    app.get(process.env.USER_API, (req, res) => {
        const user = new User();
        const response = user.getUser({});
        res.send(getExpressResponse(res, response));
    });

    app.post(`${process.env.USER_API}/signin`, (req, res) => {
        const reqBody = req.body;
        const user = new User({
            email: reqBody.email,
            password: reqBody.password
        });

        user.signin().then(response => {
            res.send(getExpressResponse(res, response));
        });
    });

    app.post(`${process.env.USER_API}/`, (req, res) => {
        const reqBody = req.body;
        const user = new User({
            email: reqBody.email,
            password: reqBody.password,
            name: reqBody.name
        });

        user.saveUser().then(response => {
            res.send(getExpressResponse(res, response));
        });
    });
};