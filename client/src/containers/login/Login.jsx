import React, { useContext, useState } from 'react';
import './Login.scss';
import logo from '../../assets/logo.png';
import { Button, ButtonBase, Divider, InputBase } from '@material-ui/core';
import { signIn } from '../../server';
import { LS_USER_OBJECT_KEY } from '../../constant';
import { } from '../../util';
import { withSnackbar } from 'notistack';
import { Loader } from '../../components';
import UserContext from '../../UserContext';

function Login(props) {
    console.log(props);
    const [state, setstate] = useState({
        emailID: '',
        password: '',
        isLoading: false
    });
    const { enqueueSnackbar, updateContext } = useContext(UserContext);

    const login = async e => {
        e.preventDefault();
        setstate(prevState => ({ ...prevState, isLoading: true }));
        try {
            const resp = await signIn({
                email: state.emailID,
                password: state.password
            });
            localStorage.setItem(LS_USER_OBJECT_KEY, JSON.stringify(resp.data));
            localStorage.setItem("token", resp.data.accessToken);
            updateContext();
            props.history.push('/portal/dashboard');
        } catch (error) {
            enqueueSnackbar && enqueueSnackbar(error, {
                variant: "error"
            });
        }
        setstate(prevState => ({ ...prevState, isLoading: false }));
    };

    return (
        <>
            <Loader isLoading={state.isLoading} />
            {
                props.location.pathname === '/login' &&
                <div className="flex flex-centered flex-c-flow full-width login-wrapper">
                    <img src={logo} style={{ height: '70px' }} alt="logo" />
                    {
                        !state.loginSuccess &&
                        <div className="flex flex-h-centered flex-c-flow m-top-1 main-wrapper">
                            <h1>Welcome back</h1>
                            <Divider style={{ margin: '15px 0' }} />
                            <form onSubmit={login}>
                                <div className="flex flex-c-flow full-width flex-v-centered">
                                    <InputBase value={state.emailID} onChange={e => setstate({ ...state, emailID: e.target.value })} placeholder="Username" name="email" required className="full-width m-top-1 login-fields" />
                                    <InputBase value={state.password} onChange={e => setstate({ ...state, password: e.target.value })} placeholder="Password" name="password" required type="password" className="full-width m-top-1 login-fields" />

                                    <ButtonBase type="submit" focusRipple disabled={!state.emailID || !state.password || state.isLoading} className="btn-login">
                                        Login
                                    </ButtonBase>

                                    <Button style={{ marginTop: '2em' }} color="secondary" onClick={e => props.history.push('/signup')}>Sign Up</Button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            }
        </>
    );
}

export default withSnackbar(Login);
