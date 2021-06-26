require('dotenv').config();
const constants = require('./constant.json');
Object.keys(constants).forEach(key => process.env[key] = constants[key]);

const express = require('express');
const { Router } = require('express');
const cors = require('cors');
const { getResponseObject, getExpressResponse } = require('./util');

const app = express();
const router = new Router();
require('./controllers')(router);
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/', router);

router.get('/', (req, res) => res.send(getExpressResponse(res, getResponseObject())));

app.listen(port, () => {
    console.log(`Meal tracker listening at http://localhost:${port}/api`);
});