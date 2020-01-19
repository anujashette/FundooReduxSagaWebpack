import React, { useState } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import WatchLaterOutlined from '@material-ui/icons/WatchLaterOutlined';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { KeyboardDatePicker } from "@material-ui/pickers";
import Picker from './Picker';
import { updateNoteItem } from '../services/userService';
import { connect } from 'react-redux';
import { ClickAwayListener } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiTypography: {
            body1: {
                fontSize: '0.8rem'
            }
        },
        MuiListItem: {
            gutters: {
                paddingLeft:'0px'
            }
        }
    }
});

const useStyles = makeStyles(theme => ({
    paper: {
        // border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        background: 'white',
        boxShadow: '0px 1px 4px 0px #888888'
    },
    svgIcon: {
        width: '17px',
        display: 'flex',
        'justify-content': 'space-evenly',
        padding: ' 0 10px 10px 10px',
        cursor: 'pointer'
    }
}));

function Reminder(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [picker, setPicker] = useState(false);

    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handlePickerClick = () => {
        console.log(picker);
        setPicker(!picker);
    };

    const handleToday = async () => {
        const today = new Date();
        today.setHours(8, 0, 0);
        props.handleSetReminder(today.toISOString());
        handleClick(null);
    }

    const handleTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(20, 0, 0);
        props.handleSetReminder(tomorrow.toISOString());
        handleClick(null);
    }

    const handleNextWeek = () => {
        const nextWeek = new Date();
        // nextWeek.setDate(nextWeek.getDate() + (1 + 7 - nextWeek.getDay()) % 7);
        nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay()) % 7 + 1);
        nextWeek.setHours(20, 0, 0);        
        props.handleSetReminder(nextWeek.toISOString());
        handleClick(null);
    }

    return (
        <div>
            <ReminderIcon className='icons-padding'
                className={classes.svgIcon}
                aria-describedby={id}
                type="button"
                onClick={handleClick} />
                {/* <ClickAwayListener onClickAway={() =>handleClick()}> */}
            <MuiThemeProvider theme={theme}>
                {!picker ?
                    <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-start'} transition >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350} className={classes.paper}>
                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem button onClick={handleToday}>
                                        <ListItemText primary="Today" />
                                        <span style={{ marginLeft: "7rem", fontSize: '0.8rem' }}>20:00</span>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Tomorrow" onClick={handleTomorrow}></ListItemText>
                                        <span style={{ marginLeft: "7rem", fontSize: '0.8rem' }}>08:00</span>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Next week" onClick={handleNextWeek}></ListItemText>
                                        <span style={{ marginLeft: "7rem", fontSize: '0.8rem' }}>Mon,08:00</span>
                                    </ListItem>
                                    <ListItem button onClick={handlePickerClick} id={id}>
                                        <WatchLaterOutlined
                                            className='icons-padding'
                                            className={classes.svgIcon}
                                            style={{ padding: '0 10px 0px 10px' }} />
                                        <ListItemText primary="Select date and time" />
                                    </ListItem>
                                </List>
                            </Fade>
                        )}
                    </Popper>
                    :
                    <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-start'} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350} className={classes.paper}>
                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem button>
                                        <ArrowBack
                                            className='icons-padding'
                                            className={classes.svgIcon}
                                            onClick={handlePickerClick} id={id}
                                            style={{ padding: '0 10px 0px 10px' }} />
                                        <ListItemText primary="Select date and time" />
                                    </ListItem>
                                    {/* {/* <ListItem button> */}
                                        {/* <Picker/> */}
                                    {/* </ListItem> */}
                                </List>
                            </Fade>
                        )}
                    </Popper>
                }
            </MuiThemeProvider>
            {/* </ClickAwayListener> */}
        </div>
    );
}

export default connect(null,null)(Reminder);