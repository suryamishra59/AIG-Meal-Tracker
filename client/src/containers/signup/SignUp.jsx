import React, { useContext, useState } from 'react';
import './SignUp.scss';
import logo from '../../assets/logo.png';
import { ButtonBase, Divider, InputBase } from '@material-ui/core';
import { register } from '../../server';
import { Loader } from '../../components';
import UserContext from '../../UserContext';

function SignUp(props) {
    const [state, setstate] = useState({
        emailID: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [isLoading, setisLoading] = React.useState(false);
    const { enqueueSnackbar } = useContext(UserContext);

    const registerUser = async e => {
        setisLoading(true);
        try {
            const payload = {
                name: state.name,
                email: state.emailID,
                password: state.password,
            };
            const resp = await register(payload);
            enqueueSnackbar && enqueueSnackbar(resp.message, {
                variant: "success"
            });
            props.history.push('/login');
        } catch (error) {
            enqueueSnackbar && enqueueSnackbar(error, {
                variant: "error"
            });
        }
        setisLoading(false);
    };

    return (
        <>
            <div className="flex flex-centered flex-c-flow full-width register-wrapper">
                <Loader isLoading={isLoading} />
                <img src={logo} style={{ height: '70px' }} alt="logo" />
                <div className="flex flex-h-centered flex-c-flow m-top-1 main-wrapper">
                    <h1>Welcome</h1>
                    <Divider style={{ margin: '15px 0' }} />
                    <form>
                        <div className="flex flex-h-centered flex-c-flow" style={{ margin: '3em 0' }}>
                            <div className="flex flex-h-centered flex-c-flow" style={{ margin: '0.5em 0' }}>
                                <label style={{ fontSize: '20px', fontWeight: 400 }} htmlFor="signup_name">Name</label>
                                <InputBase value={state.name} onChange={e => setstate({ ...state, name: e.target.value })} placeholder="First Name" name="name" required type="text" id="signup_name" className="m-top-1 register-fields" />
                            </div>
                            <div className="flex flex-h-centered flex-c-flow" style={{ margin: '0.5em 0' }}>
                                <label style={{ fontSize: '20px', fontWeight: 400 }} htmlFor="signup_email">Email</label>
                                <InputBase value={state.emailID} onChange={e => setstate({ ...state, emailID: e.target.value })} placeholder="Email" name="email" required type="email" autoFocus id="signup_email" className="m-top-1 register-fields" />
                            </div>
                            <div className="flex flex-h-centered flex-c-flow" style={{ margin: '0.5em 0' }}>
                                <label style={{ fontSize: '20px', fontWeight: 400 }} htmlFor="signup_pwd">Password</label>
                                <InputBase value={state.password} onChange={e => setstate({ ...state, password: e.target.value })} placeholder="Password" name="password" required type="password" id="signup_pwd" className="m-top-1 register-fields" />
                            </div>
                            <div className="flex flex-h-centered flex-c-flow" style={{ margin: '0.5em 0' }}>
                                <label style={{ fontSize: '20px', fontWeight: 400 }} htmlFor="signup_pwd">Confirm Password</label>
                                <InputBase value={state.confirmPassword} onChange={e => setstate({ ...state, confirmPassword: e.target.value })} placeholder="Confirm Password" name="conPassword" required type="password" id="signup_conpwd" className="m-top-1 register-fields" />
                            </div>

                            <ButtonBase onClick={registerUser} focusRipple disabled={!state.emailID || !state.name || !state.password || state.password !== state.confirmPassword || state.isLoading} className="btn-nxt primary">
                                Submit
                            </ButtonBase>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
