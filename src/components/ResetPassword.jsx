import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider, Chip, FormControl, InputAdornment, IconButton, Snackbar, FormHelperText } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";
import "../styles/registerStyle.scss";
import "../styles/loginStyle.scss";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { resetPassword } from '../services/userService';
import { validatePassword } from '../validation/validator';
import Warning from '../Assets/warning-16.png';

const theme = createMuiTheme({
    overrides: {
        MuiCardContent: {
            root: {
                padding: '10px'
            }
        },
        MuiButton: {
            root: {
                'font-weight': ' bold',
                'text-transform': 'none',
                color: 'rgb(63, 118, 255)'
            }
        },
        MuiCardActions: {
            root: {
                padding: '8px 0'
            }
        },
        MuiPaper: {
            elevation1: {
                'box-shadow': ' 0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0)'
            }
        }
    }
})


const StyledChip = styled(Chip)`
  &.MuiChip-root {
    background-color: white;
    color: darkblue;
  }
  & .MuiChip-deleteIcon {
    color: default;
    margin-left: 8px;
  }

  & .MuiChip-label {
    font-size: 15px;
    font-family: "Work Sans";
    padding-left: 14px;
    padding-right: 4px;
  }
`;

const MyChip = props => (
    <StyledChip
        {...props}
        clickable={false}
        avatar={<Avatar>AS</Avatar>}
        onDelete={() =>  console.log("I did something")}
        deleteIcon={<ExpandMoreOutlined />}
        onClick={() =>  console.log("I did something")}
    />
);

function ResetPassword(props) {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        isPassword: false,
        errorMessage: '',
        snackbaropen: false,
        snackBarMsg: ''
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


    const snackBarClose = () => {
        setValues({ ...values, snackbaropen: !values.snackbaropen });
    }

    const clearFields = (message) => {
        setValues({
            password: '',
            snackbaropen: !values.snackbaropen,
            snackBarMsg: message,
        });
    }

    const handleReset = () => {
        let param = props
        // console.log(param);

        let validatePasswordField = validatePassword(values.password);

        if (!validatePasswordField) {
            if (values.password.length > 7) {
                setValues({ ...values, isPassword: false, errorMessage: '' })

                let userObj = {
                    passwordField: {
                        newPassword: values.password
                    },
                    token: param.props.match.params.token
                }
                resetPassword(userObj)
                    .then((response) => {
                        // console.log(response);
                        clearFields('New password set successfully');
                        param.props.history.push('/')
                    })
                    .catch((error) => {
                        // console.log(error);
                        clearFields('Invalid user credetials');
                    })
            }
            else {
                setValues({ ...values, isPassword: true, errorMessage: 'Password length is too short' })
            }
        }
        else {
            setValues({ ...values, isPassword: true, errorMessage: 'Enter a password' })
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Card className='card-login' style={{ borderRadius: '10px' }}>
                <h3 className='fundoo-title-login'>
                    <span className='f-color'>F</span>
                    <span className='u-color'>u</span>
                    <span className='n-color'>n</span>
                    <span className='d-color'>d</span>
                    <span className='o-color'>o</span>
                    <span className='o1-color'>o</span>
                </h3>
                <div className='content-action-div'>
                    <CardContent className='card-content-login'>

                        <p className='recovery-title'>Account Recovery</p>

                        <MyChip label={localStorage.getItem('email')}
                            style={{ backgroundColor: '#ffffff', border: '0.5px solid rgb(138, 138, 138)', alignSelf: 'center' }} />
                        <p className='fundoo-subtitle-reset'>Enter the password that you want using with this Fundoo Account</p>

                        <FormControl >
                            <TextField
                                label="Enter your password"
                                id="password"
                                value={values.password}
                                variant="outlined"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
                                style={{ margin: '45px 0' }}
                            />
                            {!values.isPassword ?
                                null
                                :
                                <FormHelperText style={{ padding: '3px', margin: '0px', position: 'relative', top: '-40px' }} error={true} id="outlined-weight-helper-text">
                                    <img style={{ width: '13px', position: 'relative', top: '3px' }} src={Warning} />  &nbsp;
                            {values.errorMessage}</FormHelperText>
                            }

                            <InputAdornment className='eye-icon-login' position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        </FormControl>

                    </CardContent>
                    <CardActions>
                        <div className='action-button-login'>
                            <Button style={{ color: 'white', background: 'rgb(63, 118, 255)' }} onClick={handleReset} size="medium"  >Next</Button>
                            <Button size="medium">Try another way</Button>
                        </div>
                    </CardActions>
                </div>

            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={values.snackbaropen}
                autoHideDuration={4000}
                onClose={snackBarClose}
                message={<span id="message-id">{values.snackBarMsg}</span>}
            ></Snackbar>
        </MuiThemeProvider>

    )
}

export default ResetPassword;