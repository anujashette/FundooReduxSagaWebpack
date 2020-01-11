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
        takeNote: true,
        isPin: false,
        isCheckList: false,
        title: '',
        description: '',
        isArchived: false
    });

    const colorMenuRef = useRef();

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleTakeNote = () => {
        setValues({ ...values, takeNote: false });
    }

    const createNoteClose = () => {
        if (values.title.length !== 0) {
            setState();
        }
        else {
            clearState();
            props.dispatch(setColorToRedux(''))
        }
        // setValues({ ...values, takeNote: true, isCheckList: false });
    }

    const handleSetPin = () => {
        setValues({ ...values, isPin: !values.isPin });
    }

    const handleCheckList = () => {
        setValues({ ...values, takeNote: false, isCheckList: !values.isCheckList });
    }

    const handleArchive = () => {
        setValues({ ...values, isArchived: !values.isArchived })
    }

    const setState = () => {
        // const formData = new FormData();
        // formData.append('photos', this.state.imagePath);
        // const config = {
        //   headers: {
        //     token: token,
        //     'content-type': 'multipart/form-data'
        //   }
        // }
        let noteObj = {
            // file: '',
            title: values.title,
            description: values.description,
            // labelIdList: '',
            // checklist: '',
            isPined: values.isPin,
            isArchived: values.isArchived,
            color: props.reduxState.state.currentColor,
            // collaberators: ''
        }
        // props.dispatch({type:'CREATE_NOTE',values })
        requestCreateNote(noteObj)
            .then((response) => {
                clearState();
            })
            .catch((error) => {
                clearState();
            })
    }

    const clearState = () => {
        setValues({ ...values, takeNote: true, isCheckList: false, title: '', description: '', isArchived: false, isPin: false })
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.card} style={{ background: props.note.color }}>
                <div className='create-note-card'>
                    <Typography
                        // placeholder='Title'
                        className={classes.inputTitle}
                        // value={props.note.title}
                        // onChange={handleChange('title')}
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
                        // placeholder='Take a note...'
                        className={classes.inputTitle}

                        // value={props.note.description}
                        // onChange={handleChange('description')}
                        // autoFocus={true}
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
