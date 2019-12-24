import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
// import {withStyles} from "@material-ui/core/withStyles"
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import "../styles/registerStyle.scss";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ValidatorForm from 'react-material-ui-form-validator'
import { createMuiTheme, MuiThemeProvider, Typography } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        'line-height': '0'
      }
    },
    MuiFormControl: {
      root: {
        'margin': '25px 10px 0px 0px'
      }
    },
    MuiInputAdornment: {
      positionEnd: {
        'margin-left': '0px'
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
    MuiPaper: {
      elevation1: {
        'box-shadow': '0px'
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
    MuiButton: {
      root: {
        'font-weight': ' bold',
        'text-transform': 'none',
        color: 'rgb(63, 118, 255)'
      }
    },
    MuiPaper: {
      rounded: {
        'border-radius': '6px'
      }
    }
  }
});
const useStyles = makeStyles({
  card: {
    width: "60%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Register() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    firstName: ''
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


  return (
    <MuiThemeProvider theme={theme}>
      <Card className='card'>
        <form>
          <div className='content-img-div'>
            <CardContent className='card-content'>
              <h3 className='fundoo-title'>
                <span className='f-color'>F</span>
                <span className='u-color'>u</span>
                <span className='n-color'>n</span>
                <span className='d-color'>d</span>
                <span className='o-color'>o</span>
                <span className='o1-color'>o</span>
              </h3>

              <p className='bl-title'>Create your Fundoo Account</p>
              <p className='fundoo-subtitle'>Continue to Fundoo</p>
              <FormControl className={classes.margin} variant="outlined">
                <InputLabel htmlFor="firstname">First name</InputLabel>
                <OutlinedInput
                  id="firstname"
                  type={'text'}
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  className='flname-style'
                  labelWidth={70}
                  // className='password-style'
                  autoFocus={true}
                />
              </FormControl>
              <FormControl className={classes.margin} variant="outlined">
                <InputLabel htmlFor="lastname">Last name</InputLabel>
                <OutlinedInput
                  id="lastname"
                  type={'text'}
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  className='flname-style'
                  // className='password-style'

                  labelWidth={70}
                />
              </FormControl>

              <FormControl className={classes.margin} variant="outlined">
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  type={'text'}
                  value={values.firstName}
                  onChange={handleChange('username')}
                  className='username-style'
                  labelWidth={70}
                />
                <FormHelperText id="outlined-weight-helper-text">You can use letters, numbers and periods</FormHelperText>
              </FormControl>
              <div className='password-div'>
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    className='password-style'

                    labelWidth={70}
                  />

                </FormControl>
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="confirm-password">Confirm</InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    className='password-style'

                    labelWidth={70}
                  />
                </FormControl>
                <InputAdornment className='eye-icon' position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              </div>
              <FormHelperText className='username-helper-text' style={{ color: 'rgb(35, 35, 35)' }}>Use 8 or more charachters with a mix of letters, numbers and symbols</FormHelperText>
            </CardContent>
            <div className='google-img'>
              <img src='https://ssl.gstatic.com/accounts/signup/glif/account.svg'></img>
              <p variant="subtitle1" className='img-text' >One account.All of BridgeLabz working for you</p>
            </div>
          </div>
          <CardActions>
            <div className='action-button'>
              <Button size="small">Sign in instead</Button>
              <Button style={{ color: 'white', background: 'rgb(63, 118, 255)' }} size="small">Next</Button>
            </div>
          </CardActions>
        </form>
      </Card>
    </MuiThemeProvider>
  );
}
