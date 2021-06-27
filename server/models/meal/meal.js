const { getResponseObject, writeFile } = require('../../util');
const mealData = require('./meal.json');
const { v4: uuid } = require('uuid');
const _ = require('underscore');

class Meal {

    date;
    mealName;
    calories;
    constructor(object = {}) {
        this.date = object.date;
        this.mealName = object.mealName;
        this.calories = object.calories;
    }

    async createMeal(req) {
        const user = req.user;
        mealData.push({
            date: this.date,
            mealName: this.mealName,
            calories: this.calories,
            uid: user.uid,
            id: uuid()
        });

        writeFile('./models/meal/meal.json', JSON.stringify(mealData));

        const filteredMeals = JSON.parse(JSON.stringify(mealData.filter(m => m.uid === user.uid)));
        filteredMeals.forEach(meal => meal.onlyDate = meal.date.split('T')[0]);
        const resp = _.groupBy(filteredMeals, "onlyDate");

        return getResponseObject(200, "Meal saved succesfully", resp);
    }

    async getMeal(req) {
        const user = req.user;
        const meals = require('./meal.json');
        let filterMeals = meals.filter(meal => meal.uid === user.uid);
        filterMeals.forEach(meal => meal.onlyDate = meal.date.split('T')[0]);
        const resp = _.groupBy(filterMeals, "onlyDate");

        return getResponseObject(200, "Meals fetched succesfully", resp);
    }

    async updateMeal(req, id, payload) {
        const meals = require('./meal.json');
        const user = req.user;
        for (let i = 0; i < meals.length; i++) {
            const meal = meals[i];
            if (meal.id === id && user.uid === meal.uid) {
                meal.date = payload.date || meal.date;
                meal.calories = payload.calories || meal.calories;
                meal.mealName = payload.mealName || meal.mealName;

                break;
            }
        }

        await writeFile('./models/meal/meal.json', JSON.stringify(mealData));
        const filteredMeals = JSON.parse(JSON.stringify(mealData.filter(m => m.uid === user.uid)));
        filteredMeals.forEach(meal => meal.onlyDate = meal.date.split('T')[0]);
        const resp = _.groupBy(filteredMeals, "onlyDate");
        return getResponseObject(200, "Meal updated succesfully", resp);
    }

    async deleteMeal(req, id) {
        const user = req.user;
        const meals = require('./meal.json');
        let filterMeals = meals.filter(meal => meal.id !== id);
        await writeFile('./models/meal/meal.json', JSON.stringify(filterMeals));

        const filteredMeals = JSON.parse(JSON.stringify(filterMeals.filter(m => m.uid === user.uid)));

        filteredMeals.forEach(meal => meal.onlyDate = meal.date.split('T')[0]);
        const resp = _.groupBy(filteredMeals, "onlyDate");

        return getResponseObject(200, "Meal deleted succesfully", resp);
    }
}

module.exports.Meal = Meal;