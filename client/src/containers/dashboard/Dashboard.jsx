import { Divider, Accordion, AccordionSummary, Typography, AccordionDetails, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState, useContext, useEffect } from 'react';
import { Header, Loader } from '../../components';
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
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => meal.calories + acc, 0);
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
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => meal.calories + acc, 0);
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

    const editMealByID = async (mealID) => {
        setisLoading(true);
        try {
            const resp = await editMeal(mealID, {

            });
            Object.keys(resp.data).forEach(date => {
                resp.data[date].totalCalories = resp.data[date].reduce((acc, meal) => meal.calories + acc, 0);
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


    return <>
        <Loader isLoading={isLoading} />
        <Header heading="Dashboard" {...props} />
        <div className="dashboard-wrapper flex flex-c-flow flex-v-centered">
            <h1>Welcome, {name}</h1>
            <Divider style={{ width: '80%', marginBottom: '2em' }} />

            {
                Object.keys(state.meals).map(date =>
                    <Accordion key={date} className={`date-accordion ${state.meals[date].totalCalories < 2000 ? 'healthy-acc' : ''}`}>
                        <AccordionSummary
                            expandIcon={<i className="material-icons">expand_more</i>}
                        >
                            <Typography color="primary">{date} (Total Calories: {state.meals[date].totalCalories})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Meal Name</TableCell>
                                            <TableCell>Calories</TableCell>
                                            <TableCell>Edit</TableCell>
                                            <TableCell>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {state.meals[date].map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{new Date(row.date.replace('T', ' ')).toLocaleTimeString()}</TableCell>
                                                <TableCell>{row.mealName}</TableCell>
                                                <TableCell>{row.calories}</TableCell>
                                                <TableCell>
                                                    <IconButton size="small" color="primary" onClick={e => editMealByID(row.id)}>
                                                        <i className="material-icons">edit</i>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton size="small" color="primary" onClick={e => deleteMealByID(row.id)}>
                                                        <i className="material-icons">cancel</i>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                )
            }

        </div>
    </>;
}

export default Dashboard;
