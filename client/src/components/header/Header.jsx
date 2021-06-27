import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = (props) => {
    const { logout } = useContext(UserContext);
    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <img src={logo} style={{ height: '50px', marginRight: '1.5em' }} alt="logo" />
                    <Typography variant="h6" style={{ fontWeight: 400, margin: 0, cursor: 'pointer' }} color="primary" onClick={e => props.history.push('/portal')}>{props.heading}</Typography>
                    <Button style={{ marginLeft: 'auto', marginRight: '10px' }} color="primary" onClick={logout}>LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;