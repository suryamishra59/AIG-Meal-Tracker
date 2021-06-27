import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../UserContext';
import './MealTable.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const MealTable = (props) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Meal Name</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => <MealTableRow key={row.id} row={row} {...props} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const MealTableRow = (props) => {
    const [state, setstate] = useState({
        isLoading: false,
        date: '',
        mealName: '',
        calories: 0
    });
    const [isEditable, setisEditable] = useState(false);

    useEffect(() => {
        setstate({ ...state, date: props.row.date, mealName: props.row.mealName, calories: props.row.calories });
    }, []);

    const { enqueueSnackbar } = useContext(UserContext);

    const editMealByID = async () => {
        if (!state.date || !state.mealName || !state.calories || state.calories <= 0) {
            enqueueSnackbar && enqueueSnackbar("Invalid inputs.", {
                variant: "error"
            });
            return;
        }
        setstate({ ...state, isLoading: true });
        await props.editMealByID(props.row.id, {
            date: state.date,
            mealName: state.mealName,
            calories: state.calories
        });
        setstate({ ...state, isLoading: false });
        setisEditable(false);
    };


    return (
        !isEditable ?
            <TableRow key={props.row.id}>
                <TableCell>{new Date(props.row.date.replace('T', ' ')).toLocaleTimeString()}</TableCell>
                <TableCell>{props.row.mealName}</TableCell>
                <TableCell>{props.row.calories}</TableCell>
                <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={e => setisEditable(true)}>
                        <i className="material-icons">edit</i>
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={e => props.deleteMealByID(props.row.id)}>
                        <i className="material-icons">delete</i>
                    </IconButton>
                </TableCell>
            </TableRow> :

            <TableRow key={props.row.id}>
                <TableCell>
                    <TextField color="secondary"
                        label="Date"
                        type="datetime-local"
                        defaultValue={state.date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setstate({ ...state, date: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField color="secondary" label="Meal Name" value={state.mealName} onChange={e => setstate({ ...state, mealName: e.target.value })} />
                </TableCell>
                <TableCell>
                    <TextField type="number" color="secondary" label="Calories" value={state.calories} onChange={e => setstate({ ...state, calories: e.target.value })} />
                </TableCell>
                <TableCell align="center">
                    {
                        state.isLoading ?
                            <CircularProgress size={20} color="primary" />
                            :
                            <div className="flex flex-centered">
                                <IconButton size="small" color="secondary" onClick={editMealByID}>
                                    <i className="material-icons">check</i>
                                </IconButton>
                                <IconButton size="small" color="secondary" onClick={e => setisEditable(false)}>
                                    <i className="material-icons">close</i>
                                </IconButton>
                            </div>
                    }
                </TableCell>
                <TableCell align="center">
                    <IconButton size="small" color="secondary" onClick={e => props.deleteMealByID(props.row.id)}>
                        <i className="material-icons">delete</i>
                    </IconButton>
                </TableCell>
            </TableRow>
    );

};

export default MealTable;