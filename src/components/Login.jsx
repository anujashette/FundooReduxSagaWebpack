import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider, Link, FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { validateEmail } from '../validation/validator';
import "../styles/loginStyle.scss";
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
        }
    }
})

function Login(props) {

    const [values, setValues] = React.useState({
        email: '',
        isEmail: true
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleRegister = () => {
        props.props.props.history.push('/register');
    }

    const handlePassword = () => {
        event.preventDefault();
        let validateUsername = validateEmail(values.email);
        // console.log('validate email', validateUsername);

        setValues({
            ...values,
            isEmail: validateUsername,
        });
        // console.log('isEmail', values.isEmail);

        if (validateUsername) {
            props.handleNext(values.email);
        }
    }

    return (
        <div className='content-action-div'>
            <MuiThemeProvider theme={theme}>
                <CardContent className='card-content-login'>

                    <p className='bl-title'>Sign in</p>
                    <p className='fundoo-subtitle'>Continue to Fundoo</p>
                    <TextField
                        label="Email or phone"
                        id="outlined-size-normal"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email')}
                        style={{ margin: '25px 0 2px' }}
                    />
                    {values.isEmail ?
                        null
                        :
                        <FormHelperText style={{ padding: '3px', margin: '0px' }} error={true} id="outlined-weight-helper-text">
                            <img style={{ width: '13px', position: 'relative', top: '3px' }} src={Warning} />  &nbsp;
                            Enter an email or phone number</FormHelperText>
                    }
                    <p className='learn-more-p'>Not your computer? Use guest mode to sign in privately.<Link style={{ textDecoration: 'none' }} href='https://support.google.com/chrome/answer/6130773?hl=en-GB'>Learn more </Link></p>

                </CardContent>
                <CardActions>
                    <div className='action-button-login'>
                        <Button style={{ color: 'white', background: 'rgb(63, 118, 255)' }} size="medium" onClick={handlePassword}>Next</Button>
                        {/* <Button size='medium' className='forgot-button' style={{ position: 'absolute' }}> Forgot email?</Button> */}
                        <Button size="medium" onClick={handleRegister}>Create account</Button>
                    </div>
                </CardActions>
            </MuiThemeProvider>

        </div>
    )
}

export default Login;
