const { getExpressResponse } = require('../util');
const { Meal } = require('../models');
const { authenticateJWT } = require('../auth');

module.exports = (app) => {
    app.get(process.env.MEAL_API, authenticateJWT, (req, res) => {
        const meal = new Meal();
        meal.createMeal(req).then(resp => {
            res.send(getExpressResponse(res, resp));
        });
    });
};