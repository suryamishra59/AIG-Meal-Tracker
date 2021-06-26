const { getResponseObject, writeFile } = require('../../util');
const mealData = require('./meal.json');
const { v4: uuid } = require('uuid');

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
        return getResponseObject(200, "Meal saved succesfully");
    }

    getMeal(req) {
        const user = req.user;
        const meals = require('./meal.json');
        const filterMeals = meals.filter(meal => meal.uid === user.uid);

        return getResponseObject(200, "Meals fetched succesfully", filterMeals);
    }

    updateMeal(req, id, payload) {
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

        writeFile('./models/meal/meal.json', JSON.stringify(mealData));
        return getResponseObject(200, "Meal updated succesfully");
    }

    deleteMeal(id) {
        const meals = require('./meal.json');
        const filterMeals = meals.filter(meal => meal.id !== id);

        writeFile('./models/meal/meal.json', JSON.stringify(filterMeals));
        return getResponseObject(200, "Meal deleted succesfully", filterMeals);
    }
}

module.exports.Meal = Meal;