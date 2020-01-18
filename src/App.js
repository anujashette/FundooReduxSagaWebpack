import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPage';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/Protected.route.jsx';
import DisplayNotes from './components/DisplayNotes.jsx';
import ReminderNotes from './components/ReminderNotes.jsx';
import ArchiveNotes from './components/ArchiveNotes.jsx';
import BinNotes from './components/BinNotes.jsx';
import LabelNotes from './components/LabelNotes.jsx';
import EditLabel from './components/EditLabel.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" component={LoginPage} exact></Route>
                    <Route path="/register" component={RegisterPage}></Route>
                    <Route path="/resetpassword/:token" component={ResetPasswordPage}></Route>
                    {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} /> */}
                    <Route path="/dashboard/*" component={Dashboard} />
                    <Route exact path="/dashboard/*/notes" component={DisplayNotes} />
                    <Route path="/dashboard/*/reminder" component={ReminderNotes}/>
                    <Route path="/dashboard/*/label:labelname" component={LabelNotes}/>
                    <Route path="/dashboard/*/archive" component={ArchiveNotes}/>
                    <Route path="/dashboard/*/bin" component={BinNotes}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
