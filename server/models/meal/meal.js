const { getResponseObject } = require('../../util');
const mealData = require('./meal.json');

class Meal {

    constructor(object = {}) {

    }

    async createMeal(req) {
        const user = req.user;
        return getResponseObject();
    }
}

module.exports.Meal = Meal;