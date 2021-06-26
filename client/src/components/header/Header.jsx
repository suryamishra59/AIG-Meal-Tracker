import { AppBar, Button, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import UserContext from '../../UserContext';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = (props) => {
    const [state, setstate] = useState({
        anchor: false
    });
    const { logout, isMobile } = useContext(UserContext);

    const toggleDrawer = (open) => {
        setstate({ ...state, anchor: open });
    };

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={e => toggleDrawer(true)}>
                        <i className="material-icons">menu</i>
                    </IconButton>
                    <Typography variant="h6" style={{ fontWeight: 300, margin: 0, cursor: 'pointer' }} color="secondary" onClick={e => props.history.push('/portal')}>{props.heading}</Typography>
                    <Button style={{ marginLeft: 'auto', marginRight: '10px' }} color="secondary" onClick={logout}>LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;