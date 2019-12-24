import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

class App extends Component     {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={LoginPage} exact></Route>
                        <Route path="/register" component={RegisterPage}>
                            {/* <Route path="/forgotpass" component={ForgotPage}></Route>
                        <Route path="/resetpassword:token" component={ResetPasswordPage}></Route>
                        <Route path="/dashboard" component={DashboardPage}> */}
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
