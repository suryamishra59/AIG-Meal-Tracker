const fs = require('fs/promises');

module.exports = {

    getResponseObject: (statusCode = 200, message = "Request served", data = {}) => {
        return { statusCode, message, data };
    },

    getExpressResponse: (res, responseObject) => {
        res.status(responseObject.statusCode);
        delete responseObject.statusCode;
        return responseObject;
    },

    readFile: async (filePath) => {
        return await fs.readFile(filePath);
    },

    writeFile: async (filePath, data) => {
        return await fs.writeFile(filePath, data);
    },



};