import React from 'react';
import './App.scss';
import { UserProvider } from './UserContext';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import axios from "axios";
import { withSnackbar } from 'notistack';
import { NotFound } from './components';
import { SignUp, Login, Portal } from './containers';
import { helloWorld } from './server';
import { LS_USER_OBJECT_KEY } from './constant';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            isAuthenticated: window.localStorage.getItem(LS_USER_OBJECT_KEY) ? Object.keys(JSON.parse(window.localStorage.getItem(LS_USER_OBJECT_KEY))).length > 1 : false,
            isMobile: window.matchMedia("(max-width: 768px)").matches,
            updateContext: this.updateContext,
            logout: this.logout
        };

    }

    componentDidMount() {
        this.setState({ enqueueSnackbar: this.props.enqueueSnackbar }, _ => this.updateContext());
        // helloWorld().then(() => console.log("Server connected..."));
    }

    showNotification(title, body) {
        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification(title, body);
                });
            }
        });
    }

    updateContext = _ => {
        this.setState({
            isMobile: window.matchMedia("(max-width: 768px)").matches,
            ...JSON.parse(window.localStorage.getItem(LS_USER_OBJECT_KEY)),
            isAuthenticated: window.localStorage.getItem(LS_USER_OBJECT_KEY) ? Object.keys(JSON.parse(window.localStorage.getItem(LS_USER_OBJECT_KEY))).length > 1 : false,
        });
    };

    logout = _ => {
        localStorage.clear();
        this.updateContext();
    };

    render() {

        const theme = createMuiTheme({
            palette: {
                type: this.state.isDarkThemeEnabled ? 'dark' : 'light',
                // type: 'dark',
                primary: {
                    main: document.documentElement.style.getPropertyValue('--secondary-color') || '#ff0056'
                },
                secondary: {
                    main: document.documentElement.style.getPropertyValue('--logo-color') || '#4b33d1'
                }
            },
            typography: {
                fontFamily: "'Work Sans', sans-serif"
            },
        });

        // Add a response interceptor
        axios.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
                if (!error.response || error.response.status !== 401) throw error;

                // console.log("401 Unauthorized: Moving Forward to refresh the session");
                console.log("Session Expired");
                this.logout();

                // try {
                //     if (originalRequest.url === REFRESH_TOKEN_API) throw new Error("Session Expired");
                //     await refreshToken();
                //     await this.updateContext();
                //     error.response.config.headers.token = window.localStorage.getItem("token");
                //     return await invokeAPI(error.response.config);
                // } catch (error) {
                //     console.log(error.toString());
                //     this.logout();
                //     return new Error();
                // }
            });

        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else {
            console.log("Notifications are supported");
            Notification.requestPermission().then(console.log);
        }

        return <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/login" render={(props) => <UserProvider value={this.state}> <Login {...props} /> </UserProvider>} />
                        <Route exact path="/signup" render={(props) => <UserProvider value={this.state}> <SignUp {...props} /> </UserProvider>} />
                        <Route path="/portal" render={(props) => <UserProvider value={this.state}>{this.state.isAuthenticated ? <Portal {...props} /> : <Redirect to={'/login'} />}</UserProvider>} />
                        <Route path="/" render={_ => <Redirect to={this.state.isAuthenticated ? '/portal' : '/login'} />} />
                        <Route component={NotFound} />
                    </Switch>
                </Router >
            </ThemeProvider>
        </ >;
    }
}

export default withSnackbar(App);
