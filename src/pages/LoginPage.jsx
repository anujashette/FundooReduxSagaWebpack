import React, { Component } from 'react';
import LoginCard from '../components/LoginCard';
class LoginPage extends Component {
    render() {
        return (
                <LoginCard props={this.props}/>
        )
    }
}    

export default LoginPage;
