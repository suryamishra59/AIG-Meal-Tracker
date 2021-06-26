const { getResponseObject, getExpressResponse } = require('../util');
const { User } = require('../models');

module.exports = (app) => {
    app.get(process.env.USER_API, (req, res) => {
        const user = new User();
        const response = user.getUser({});
        const expResp = getExpressResponse(res, response);
        res.send(expResp);
    });

    app.post(`${process.env.USER_API}/signin`, (req, res) => {
        const reqBody = req.body;
        const user = new User({
            email: reqBody.email,
            password: reqBody.password
        });

        const response = user.signin();
        const expResp = getExpressResponse(res, response);
        res.send(expResp);
    });

    app.post(`${process.env.USER_API}/`, (req, res) => {
        const reqBody = req.body;
        const user = new User({
            email: reqBody.email,
            password: reqBody.password,
            name: reqBody.name
        });

        const response = user.saveUser();
        const expResp = getExpressResponse(res, response);
        res.send(expResp);
    });
};