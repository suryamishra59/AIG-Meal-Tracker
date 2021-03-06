import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './Portal.scss';
import { NotFound } from '../../components';
import { Dashboard } from '../';

function Portal(props) {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/portal/dashboard" render={(props) => <Dashboard {...props} />} />
                    <Route path="/portal" render={(props) => <Redirect to="/portal/dashboard" />} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Portal;
