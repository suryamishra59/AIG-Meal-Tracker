import { Divider, Accordion, AccordionSummary, Typography, AccordionDetails, Button, TextField } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import { Header, Loader, MealTable } from '../../components';
import { getMeals, deleteMeal, editMeal, createMeal } from '../../server';
import UserContext from '../../UserContext';
import './Dashboard.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import addMealImg from '../../assets/add-meal.jpg';

function Dashboard(props) {
    const [state, setstate] = useState({
        meals: [],
    });
    const [newMeal, setnewMeal] = useState({
        date: "2021-06-27T10:52",
        mealName: '',
        calories: 0
    });
    const [isLoading, setisLoading] = useState(false);
    const { enqueueSnackbar, name } = useContext(UserContext);
    const [open, setOpen] = useState(false);

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

    const addMeal = async () => {

        if (!newMeal.date || !newMeal.mealName || !newMeal.calories || newMeal.calories <= 0) {
            enqueueSnackbar && enqueueSnackbar("Invalid inputs.", {
                variant: "error"
            });
            return;
        }

        if (new Date(newMeal.date) > new Date()) {
            enqueueSnackbar && enqueueSnackbar("Selected date-time cannot be of future's", {
                variant: "error"
            });
            return;
        }

        setisLoading(true);
        try {
            const resp = await createMeal(newMeal);
            Object.keys(resp.data).forEach(date => {
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => parseInt(meal.calories) + acc, 0);
            });

            enqueueSnackbar && enqueueSnackbar("Meal added successfully", {
                variant: "success"
            });
            setstate({ ...state, meals: resp.data });
            setnewMeal({
                date: "2021-06-27T10:52",
                mealName: '',
                calories: 0
            });
        } catch (error) {
            enqueueSnackbar && enqueueSnackbar(error, {
                variant: "error"
            });
        }
        setisLoading(false);
        setOpen(false);
    };


    return <>
        <Loader isLoading={isLoading} />
        <Header heading="Dashboard" {...props} />
        <div className="dashboard-wrapper flex flex-c-flow flex-v-centered">
            <h1>Welcome, {name}</h1>
            <Divider style={{ width: '80%', marginBottom: '2em' }} />

            <Button style={{ marginBottom: '2em' }} onClick={e => setOpen(true)} color="primary" variant="contained" size="large" startIcon={<i className="material-icons">add</i>}>Add a Meal</Button>

            {
                Object.keys(state.meals).map(date =>
                    <Accordion key={date} className={`date-accordion ${state.meals[date].totalCalories < 2000 ? 'healthy-acc' : 'not-healthy-acc'}`}>
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

        <Dialog open={open} onClose={e => setOpen(false)}>
            <DialogTitle id="form-dialog-title" style={{ background: '#f5f5f5', color: 'var(--secondary-color)' }}>Add a Meal</DialogTitle>
            <DialogContent style={{ background: '#f5f5f5' }}>
                <div className="flex flex-h-centered full-width">
                    <img src={addMealImg} alt="meal" height={80} style={{ userSelect: 'none', marginBottom: '2em' }} />
                </div>
                <TextField color="secondary"
                    label="Date"
                    type="datetime-local"
                    defaultValue="2021-06-27T10:52"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    required
                    onChange={e => setnewMeal({ ...newMeal, date: e.target.value })}
                    style={{ marginTop: '1em' }}
                />
                <TextField style={{ marginTop: '1em' }} required fullWidth color="secondary" label="Meal Name" value={newMeal.mealName} onChange={e => setnewMeal({ ...newMeal, mealName: e.target.value })} />
                <TextField style={{ marginTop: '1em' }} required fullWidth type="number" color="secondary" label="Calories" value={newMeal.calories} onChange={e => setnewMeal({ ...newMeal, calories: e.target.value })} />
            </DialogContent>
            <DialogActions style={{ background: '#f5f5f5' }}>
                <Button onClick={e => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={addMeal} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}

export default Dashboard;
