import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { fontSize } from '@material-ui/system';
import "../styles/loginStyle.scss";

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

    const handleRegister = () => {
        console.log('props=>',props);
        
       props.props.props.history.push('/register');
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
                        style={{ margin: '25px 0' }}
                    />
                    <p className='learn-more-p'>Not your computer? Use guest mode to sign in privately.<Link style={{textDecoration :'none'}} href='https://support.google.com/chrome/answer/6130773?hl=en-GB'>Learn more </Link></p>

                </CardContent>
                <CardActions>
                    <div className='action-button-login'>
                        <Button style={{ color: 'white', background: 'rgb(63, 118, 255)' }} size="medium" onClick={props.handleNext}>Next</Button>
                        <Button size='medium' className='forgot-button' style={{ position: 'absolute' }}> Forgot email?</Button>
                        <Button size="medium" onClick={handleRegister}>Create account</Button>
                    </div>
                </CardActions>
            </MuiThemeProvider>

        </div>
    )
}

export default Login;
