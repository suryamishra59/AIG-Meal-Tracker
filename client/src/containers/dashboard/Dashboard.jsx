import { Divider, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import { Header, Loader, MealTable } from '../../components';
import { getMeals, deleteMeal, editMeal } from '../../server';
import UserContext from '../../UserContext';
import './Dashboard.scss';

function Dashboard(props) {
    const [state, setstate] = useState({
        meals: []
    });
    const [isLoading, setisLoading] = useState(false);
    const { enqueueSnackbar, isMobile, name } = useContext(UserContext);

    useEffect(() => {
        getAllMeals();
    }, []);

    const getAllMeals = async _ => {
        setisLoading(true);
        try {
            const resp = await getMeals();
            Object.keys(resp.data).forEach(date => {
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => parseInt(meal.calories) + acc, 0);
            });

            setstate({ ...state, meals: resp.data });
        } catch (error) {
            enqueueSnackbar && enqueueSnackbar(error, {
                variant: "error"
            });
        }
        setisLoading(false);
    };

    const deleteMealByID = async (mealID) => {
        setisLoading(true);
        try {
            const resp = await deleteMeal(mealID);
            Object.keys(resp.data).forEach(date => {
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => parseInt(meal.calories) + acc, 0);
            });

            enqueueSnackbar && enqueueSnackbar("Meal deleted successfully", {
                variant: "success"
            });
            setstate({ ...state, meals: resp.data });
        } catch (error) {
            enqueueSnackbar && enqueueSnackbar(error, {
                variant: "error"
            });
        }
        setisLoading(false);
    };

    const editMealByID = async (mealID, payload) => {
        try {
            const resp = await editMeal(mealID, payload);
            Object.keys(resp.data).forEach(date => {
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => parseInt(meal.calories) + acc, 0);
            });

            enqueueSnackbar && enqueueSnackbar("Meal updated successfully", {
                variant: "success"
            });
            setstate({ ...state, meals: resp.data });
        } catch (error) {
            enqueueSnackbar && enqueueSnackbar(error, {
                variant: "error"
            });
        }
    };


    return <>
        <Loader isLoading={isLoading} />
        <Header heading="Dashboard" {...props} />
        <div className="dashboard-wrapper flex flex-c-flow flex-v-centered">
            <h1>Welcome, {name}</h1>
            <Divider style={{ width: '80%', marginBottom: '2em' }} />

            <Button style={{ marginBottom: '2em' }} color="primary" variant="contained" size="large" startIcon={<i className="material-icons">add</i>}>Add a Meal</Button>

            {
                Object.keys(state.meals).map(date =>
                    <Accordion key={date} className={`date-accordion ${state.meals[date].totalCalories < 2000 ? 'healthy-acc' : ''}`}>
                        <AccordionSummary
                            expandIcon={<i className="material-icons">expand_more</i>}
                        >
                            <Typography color="primary">{date} (Total Calories: {state.meals[date].totalCalories})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MealTable key={date} rows={state.meals[date]} deleteMealByID={deleteMealByID} editMealByID={editMealByID} />
                        </AccordionDetails>
                    </Accordion>
                )
            }

        </div>
    </>;
}

export default Dashboard;
