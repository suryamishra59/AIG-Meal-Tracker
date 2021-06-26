const constants = require('./constant.json');
Object.keys(constants).forEach(key => process.env[key] = constants[key]);

const express = require('express');
const { Router } = require('express');
const router = new Router();
const cors = require('cors');
const app = express();
const { getResponseObject, getExpressResponse } = require('./util');
const port = process.env.PORT;

app.use('/api/', router);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get('/', (req, res) => {
    const response = getResponseObject();
    const expResp = getExpressResponse(res, response);
    res.send(expResp);
});

app.listen(port, () => {
    console.log(`Meal tracker listening at http://localhost:${port}/api`);
});