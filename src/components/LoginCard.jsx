import React from "react";
import Card from "@material-ui/core/Card";

// import {withStyles} from "@material-ui/core/withStyles"
import "../styles/registerStyle.scss";
import "../styles/loginStyle.scss";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// Components
import Login from './Login';
import PasswordComponent from "./PasswordComponent";
import ResetPassword from '../components/ResetPassword'

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        'line-height': '0'
      }
    },
    MuiIconButton: {
      edgeEnd: {
        'margin-right': '0px'
      }
    },
    MuiIconButton: {
      root: {
        padding: '0px 0'
      }
    },
    MuiFormHelperText: {
      contained: {
        margin: '8px 2px 0',
        color: 'rgb(35, 35, 35)',
        width: '80%'
      }
    },
    MuiCardActions: {
      root: {
        display: 'flex',
        padding: '30px 8px 45px'
      }
    },
    MuiPaper: {
      elevation1: {
        'box-shadow': ' 0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0)'
      }
    }
  }
});

export default function LoginCard() {

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    firstName: '',
    isNext: false,
    isResetPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleNext = () => {
    console.log('in handle next');
    setValues({ isNext: !values.isNext })
  }

  const handleReset = () => {
    console.log('in reset password',values.isResetPassword);

    setValues({ isNext: !values.isNext, isResetPassword: !values.isResetPassword })
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Card className='card-login' style={{ borderRadius: '10px' }}>
        {/* <div className='content-img-div'> */}
        <h3 className='fundoo-title-login'>
          <span className='f-color'>F</span>
          <span className='u-color'>u</span>
          <span className='n-color'>n</span>
          <span className='d-color'>d</span>
          <span className='o-color'>o</span>
          <span className='o1-color'>o</span>
        </h3>
        { values.isNext ?
          <PasswordComponent handleReset={handleReset} />
          // null
          :
          // null
          <Login handleNext={handleNext} />
        }

        { values.isNext && values.isResetPassword=== true ?
          // <PasswordComponent handleReset={handleReset} />
          null
          :
          <Login handleNext={handleNext} />
        }

        { values.isResetPassword ?
          <ResetPassword />
          :
          null
        }
      </Card>
    </MuiThemeProvider>
  );
}
