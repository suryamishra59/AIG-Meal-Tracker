import React, { useState } from 'react';
import './Login.scss';
import logo from '../../assets/logo.png';
import { loginUser } from '../../util';
import { withSnackbar } from 'notistack';

function Login(props) {
    const [state, setstate] = useState({
        emailID: '',
        password: '',
        loginSuccess: false
    });

    const login = async _ => {
        await loginUser();
        setstate(prevState => ({ ...prevState, loginSuccess: true }));
        props.history.push('/portal/dashboard');
    };

    return (
        <>
            <h2>LOGIN PAGE</h2>
        </>
    );
}

export default withSnackbar(Login);
