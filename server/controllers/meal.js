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
        const resp = meal.getMeal(req);
        res.send(getExpressResponse(res, resp));
    });

    app.put(process.env.MEAL_BY_ID_API, authenticateJWT, (req, res) => {
        const meal = new Meal();
        const resp = meal.updateMeal(req, req.params.id, req.body);
        res.send(getExpressResponse(res, resp));
    });

    app.delete(process.env.MEAL_BY_ID_API, authenticateJWT, (req, res) => {
        const meal = new Meal();
        const resp = meal.deleteMeal(req.params.id);
        res.send(getExpressResponse(res, resp));
    });
};