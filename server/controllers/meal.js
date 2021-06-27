const { getExpressResponse } = require('../util');
const { Meal } = require('../models');
const { authenticateJWT } = require('../auth');

module.exports = (app) => {
    app.post(process.env.MEAL_API, authenticateJWT, (req, res) => {
        const meal = new Meal({
            date: req.body.date,
            mealName: req.body.mealName,
            calories: req.body.calories,
        });
        meal.createMeal(req).then(resp => {
            res.send(getExpressResponse(res, resp));
        });
    });

    app.get(process.env.MEAL_API, authenticateJWT, (req, res) => {
        const meal = new Meal();
        meal.getMeal(req).then(resp => {
            res.send(getExpressResponse(res, resp));
        });
    });

    app.put(process.env.MEAL_BY_ID_API, authenticateJWT, (req, res) => {
        const meal = new Meal();
        meal.updateMeal(req, req.params.id, req.body).then(resp => {
            res.send(getExpressResponse(res, resp));
        });
    });

    app.delete(process.env.MEAL_BY_ID_API, authenticateJWT, (req, res) => {
        const meal = new Meal();
        meal.deleteMeal(req.params.id).then(resp => {
            res.send(getExpressResponse(res, resp));
        });
    });
};