module.exports = {

    getResponseObject: (statusCode = 200, message = "Request served", data = {}) => {
        return {
            statusCode,
            message,
            data
        };
    },

    getExpressResponse: (res, responseObject) => {
        res.status(responseObject.statusCode);
        delete responseObject.statusCode;
        return responseObject;
    }

}