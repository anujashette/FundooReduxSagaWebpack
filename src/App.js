import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPage';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/Protected.route.jsx';
import DrawerLeft from './components/DrawerLeft.jsx';
import DisplayArea from './components/DisplayArea.jsx';
import DisplayNotes from './components/DisplayNotes.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" component={LoginPage} exact></Route>
                    <Route path="/register" component={RegisterPage}></Route>
                    <Route path="/resetpassword/:token" component={ResetPasswordPage}></Route>
                    {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} /> */}
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/dashboard/notes" component={DisplayNotes} />
                    {/* <Route exact path="/dashboard/takenotes/notes" component={DisplayNotes}/> */}
                    <Route path="/dashboard/reminder" component={DisplayNotes}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
