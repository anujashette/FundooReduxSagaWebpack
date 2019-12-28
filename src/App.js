import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPage';
import ResetPassword from './components/ResetPassword.jsx';
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    {/* <Switch> */}
                    <Route path="/" component={LoginPage} exact></Route>
                    <Route path="/register" component={RegisterPage}></Route>
                    <Route path="/resetpassword:token" component={ResetPasswordPage}></Route>
                    {/* <Route path="/dashboard" component={DashboardPage}> */}

                    {/* </Switch> */}
                </BrowserRouter>
                {/* <ResetPassword/> */}
            </div>
        )
    }
}

export default App;
