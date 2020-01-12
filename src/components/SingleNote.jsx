// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import React, { useState } from 'react';
import { InputBase, createMuiTheme, MuiThemeProvider, Typography } from '@material-ui/core';
import '../styles/displayNotes.scss';
import Image from '@material-ui/icons/Image'
import Unpin from '../Assets/unpin.svg';
import Pin from '../Assets/pin.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Reminder from '@material-ui/icons/NotificationsOutlined'
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import Color from '@material-ui/icons/ColorLensOutlined';
import More from '@material-ui/icons/MoreVertOutlined';
import NewCheckList from './NewCheckList';
import { connect } from 'react-redux';
import { requestCreateNote } from '../services/userService';
import ColorMenu from './ColorMenu';
import { setColorToRedux } from '../actions';
import EditNote from './EditNote';

const { useRef } = React;
const theme = createMuiTheme({
    overrides: {

    }
})
const useStyles = makeStyles({
    card: {
        minWidth: 230,
        maxWidth: 230,
        // display: 'flex',
        // justifyContent: 'center'
        margin: '0 0 16px 0',
        height:'fit-content'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    inputTitle: {
        fontSize: 14,
        width: '93%',
        padding: '5px 10px 0 10px'
    },
    pos: {
        marginBottom: 12,
    },
    svgIcon: {
        width: '17px',
        display: 'flex',
        'justify-content': 'space-evenly',
        padding: ' 0 10px 10px 10px',
        cursor:'pointer'
    },
});

function SingleNote(props) {
    const classes = useStyles();
    
    const [values, setValues] = useState({
        isPin: false,
        isCheckList: false,
        isArchived: false,
        isEdited:false
    });

    const colorMenuRef = useRef();

    const handleSetPin = () => {
        setValues({ ...values, isPin: !values.isPin });
    }

    const handleCheckList = () => {
        setValues({ ...values, isCheckList: !values.isCheckList });
    }

    const handleArchive = () => {
        setValues({ ...values, isArchived: !values.isArchived })
    }

    const handleEditClose = () => {
        setValues({...values, isEdited: !values.isEdited})
    }

    return (
        <MuiThemeProvider theme={theme}>
            {!values.isEdited ? 
            <div>
                {!props.note.isArchived && !props.note.isDeleted ?
                    <Card className={classes.card} style={{ background: props.note.color }}>
                    <div className='create-note-card'>
                        <Typography
                            className={classes.inputTitle}
                            onClick={handleEditClose}
                        >{props.note.title}</Typography>
    
                        {props.note.isPined ?
                            <img src={Pin} className='pin-icon' />
                            :
                            <img src={Unpin} className='pin-icon' />
                        }
                    </div>
                    {values.isCheckList ?
                        <NewCheckList />
                        :
                        <Typography
                            className={classes.inputTitle}
                            onClick={handleEditClose}
                        >{props.note.description}</Typography>
                    }
    
                    <div className='display-icons-div'>
                        <Reminder className='icons-padding' className={classes.svgIcon} />
                        <PersonAdd className='icons-padding' className={classes.svgIcon} />
                        <Color className='icons-padding' className={classes.svgIcon}
                            onClick={(event) => colorMenuRef.current.handleClick(event)}
                        // onMouseLeave={() => colorMenuRef.current.handleClose()}
                        />
                        <Image className='icons-padding' className={classes.svgIcon} />
                        <Archive className='icons-padding' className={classes.svgIcon} onClick={handleArchive} />
                        <More className='icons-padding' className={classes.svgIcon} />
                    </div>
                    <ColorMenu />
                </Card>
                :
                    null
                }
                </div>
                : 
                <EditNote handleEditClose={handleEditClose} open={values.isEdited} note={props.note} />
            }
            
            
            <ColorMenu ref={colorMenuRef} />

        </MuiThemeProvider>
    )
}

const mapStateToProps = (state) => {
    // console.log('redux', state);

    return {
        reduxState: {
            state
        }
    }
}

export default connect(mapStateToProps)(SingleNote);
