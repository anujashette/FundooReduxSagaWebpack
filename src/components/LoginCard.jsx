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
import Snackbar from "./Snackbar";

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

export default function LoginCard(props) {

  const [values, setValues] = React.useState({
    isNext: false,
    email: '',
    snackbaropen: false,
    snackBarMsg: ''
  });

  const handleNext = (username) => {
    // console.log('in handle next', username);
    localStorage.setItem('email', username)
    setValues({ ...values, isNext: !values.isNext, email: username })
  }

  // const handleNext = () => {
  //   // console.log('in handle next');
  //   localStorage.setItem('email')
  //   setValues({...values, isNext: !values.isNext })
  // }

  const snackBarClose = (errorMessage) => {
    // console.log('after error',errorMessage);
    setValues({ ...values, snackbaropen: !values.snackbaropen, snackBarMsg: errorMessage });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Snackbar
        snackBarClose={snackBarClose}
        snackbaropen={values.snackbaropen}
        snackBarMsg={values.snackBarMsg}
      ></Snackbar>
      <Card className='card-login' style={{ borderRadius: '10px' }}>
        <h3 className='fundoo-title-login'>
          <span className='f-color'>F</span>
          <span className='u-color'>u</span>
          <span className='n-color'>n</span>
          <span className='d-color'>d</span>
          <span className='o-color'>o</span>
          <span className='o1-color'>o</span>
        </h3>

        {values.isNext ?
          <PasswordComponent
            email={values.email}
            props={props}
            snackBarClose={snackBarClose}
          />
          :
          <Login
            handleNext={handleNext}
            props={props}
          />
        }
      </Card>
    </MuiThemeProvider>
  );
}