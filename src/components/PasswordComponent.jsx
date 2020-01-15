import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider, Chip } from '@material-ui/core';
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import "../styles/loginStyle.scss";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Warning from '../Assets/warning-16.png';
import { validatePassword } from '../validation/validator';
import { loginUser, forgotPassword } from '../services/userService';
import auth from './auth';

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
        avatar={<Avatar>A</Avatar>}
        onDelete={() => console.log("I did something")}
        deleteIcon={<ExpandMoreOutlined />}
        onClick={() => console.log("I did something")}
    />
);

function PasswordComponent(props) {


    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        isPassword: false,
        errorMessage: '',
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

    const handleForgot = () => {        
        let userObj = {
            "email": props.email
        }

        forgotPassword(userObj)
            .then((response) => {
                console.log(response);
                setValues({ isLoggedIn: true });

                clearFields();
                props.snackBarClose('Set password link sent to you registered email, please check.');
            })
            .catch((error) => {
                console.log(error);
                props.snackBarClose('Invalid user credetials')
            })
    }

    const clearFields = () => {
        setValues({
            password: ''
        });
    }

    const handleSubmit = () => {
        console.log('handle submit---->',props);

        let validatePasswordField = validatePassword(values.password);

        if (!validatePasswordField) {
            if (values.password.length > 7) {
                setValues({ ...values, isPassword: false, errorMessage: '' })

                let userObj = {
                    "username": props.email,
                    "password": values.password
                }
                loginUser(userObj)
                    .then((response) => {
                        console.log('response', response.data);
                        localStorage.setItem('firstName', response.data.firstName);
                        localStorage.setItem('lastName', response.data.lastName)
                        localStorage.setItem('email', response.data.email)
                        localStorage.setItem('userId', response.data.userId)
                        localStorage.setItem('token', response.data.id)
                        localStorage.setItem('imageUrl', response.data.imageUrl)
                        auth.login(() => {
                            props.props.props.history.push('/dashboard/takenotes/notes');
                            console.log('logged in', props);
                        });

                        props.snackBarClose('User logged in successfully');
                        clearFields();
                    })
                    .catch((error) => {
                        console.log(error);
                        // props.snackBarClose('Invalid user credetials');
                        clearFields();
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
        <div className='content-action-div'>
            <MuiThemeProvider theme={theme}>
                <CardContent className='card-content-login'>
                    <p className='fundoo-subtitle'>Continue to Fundoo</p>

                    <MyChip label={props.email}
                        style={{ backgroundColor: '#ffffff', border: '0.5px solid rgb(138, 138, 138)', alignSelf: 'center' }} />
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
                        <Button style={{ color: 'white', background: 'rgb(63, 118, 255)' }} size="medium" onClick={handleSubmit}>Next</Button>
                        <Button size="medium" onClick={handleForgot}>Forgot password?</Button>
                    </div>
                </CardActions>
            </MuiThemeProvider>
        </div>
        // )
    )
}

export default PasswordComponent;
