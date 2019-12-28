import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider, Chip } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";
import "../styles/registerStyle.scss";
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
        onDelete={() => console.log("I did something")}
        deleteIcon={<ExpandMoreOutlined />}
        onClick={() => console.log("I did something")}
    />
);

function ResetPassword() {

    const handleDelete = () => {
        console.log('handle delete');
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
                <div className='content-action-div'>
                    <CardContent className='card-content-login'>

                        <p className='recovery-title'>Account Recovery</p>

                        <MyChip label='shette.anuja@gmail.com'
                            style={{ backgroundColor: '#ffffff', border: '0.5px solid rgb(138, 138, 138)', alignSelf: 'center' }} />
                        <p className='fundoo-subtitle-reset'>Enter the password that you want using with this Fundoo Account</p>

                        <TextField
                            label="Enter your password"
                            id="outlined-size-normal"
                            variant="outlined"
                            style={{ margin: '25px 0' }}
                        />

                    </CardContent>
                    <CardActions>
                        <div className='action-button-login'>
                            <Button style={{ color: 'white', background: 'rgb(63, 118, 255)' }} size="medium"  >Next</Button>
                            <Button size="medium" href='/register'>Try another way</Button>
                        </div>
                    </CardActions>
                </div>

            </Card>
        </MuiThemeProvider>

    )
}

export default ResetPassword;