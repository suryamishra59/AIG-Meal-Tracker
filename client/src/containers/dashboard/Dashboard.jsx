import { Divider } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { Header, Loader } from '../../components';
import {  } from '../../server';
import UserContext from '../../UserContext';
import './Dashboard.scss';

function Dashboard(props) {
    const [state, setstate] = useState({
    });
    const [isLoading, setisLoading] = useState(false);
    const { enqueueSnackbar, isMobile, name } = useContext(UserContext);

    return (
        <>
            <Loader isLoading={isLoading} />
            <Header heading="Dashboard" {...props} />
            <div className="dashboard-wrapper flex flex-c-flow flex-v-centered">
                <h1>Welcome, {name}</h1>
                <Divider style={{ width: '80%' }} />
            </div>
        </>
    );
}

export default Dashboard;
