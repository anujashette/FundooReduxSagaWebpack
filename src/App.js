import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPage';
import Dashboard from './components/Dashboard.jsx';
import Appbar from './components/Appbar.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" component={LoginPage} exact></Route>
                    <Route path="/register" component={RegisterPage}></Route>
                    <Route path="/resetpassword/:token" component={ResetPasswordPage}></Route>
                    <Route path="/dashboard" component={Dashboard}></Route>
                    {/* <Route path="/dashboard/app" component={Appbar}></Route> */}
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
