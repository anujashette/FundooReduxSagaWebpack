import React, { useState } from 'react';
import { InputBase, createMuiTheme, MuiThemeProvider, Button, Chip } from '@material-ui/core';
import '../styles/takeNote.scss';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import List from '@material-ui/icons/List'
import Cancel from '@material-ui/icons/Close'
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
import { setColorToRedux, clearLabelCheck } from '../actions';
import Label from './Label';
const { useRef } = React;

const theme = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                width: '18px'
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.9rem',
                fontWeight: '600'
            }
        }
    }
})
function TakeNote(props) {
    const [values, setValues] = useState({
        takeNote: true,
        isPin: false,
        isCheckList: false,
        title: '',
        description: '',
        isArchived: false
    });
    const menuRef = useRef();
    const lebelMenuRef = useRef();
    let labelID = [];

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
            labelIdList: labelID,
            // checklist: '',
            // reminder:'',
            isPined: values.isPin,
            isArchived: values.isArchived,
            color: props.reduxState.state.currentColor,
            // collaberators: ''
        }
        requestCreateNote(noteObj)
            .then((response) => {
                clearState();
            })
            .catch((error) => {
                clearState();
            })
    }

    const handleDelete = (key) => {

    }

    const clearState = () => {
        setValues({ ...values, takeNote: true, isCheckList: false, title: '', description: '', isArchived: false, isPin: false });
        labelID = [];
        props.dispatch(clearLabelCheck())
    }
    var label = props.reduxState.state.labels.map((key, index) => {

        if (key.isDeleted && key !== null) {
            labelID.push(key.id); ``
            return (
                <Chip
                    key={index}
                    label={key.label}
                    onDelete={handleDelete(key)}
                    deleteIcon={<Cancel style={{ width: "18px", height: "18px" }} />}
                    style={{
                        height: "20px", maxWidth: "100px"
                    }}
                />
            )
        }
    });

    return (
        <MuiThemeProvider theme={theme}>
            {/* <ClickAwayListener onClickAway={createNoteClose}> */}
            {values.takeNote ?
                <div className='take-note-div' >
                    <InputBase
                        placeholder='Take a note...'
                        className='input-base'
                        onClick={handleTakeNote}
                    ></InputBase>
                    <CheckBoxOutlinedIcon
                        style={{ padding: '9px 7 0px 7' }}
                        onClick={handleCheckList} />
                    <List
                        style={{ padding: '9px 7 0px 7' }} />
                    <Image
                        onClick={handleTakeNote}
                        style={{ padding: '9px 7 0px 7' }} />
                </div>
                :
                <div className='create-note-div' style={{ background: props.reduxState.state.currentColor }}>
                    <div className='create-note-card'>
                        <InputBase
                            placeholder='Title'
                            className='input-base-create'
                            value={values.title}
                            onChange={handleChange('title')}
                        ></InputBase>

                        {values.isPin ?
                            <img src={Pin} className='pin-icon' onClick={handleSetPin} />
                            :
                            <img src={Unpin} className='pin-icon' onClick={handleSetPin} />
                        }
                    </div>
                    {values.isCheckList ?
                        <NewCheckList />
                        :
                        <InputBase
                            placeholder='Take a note...'
                            className='input-base-create'
                            value={values.description}
                            onChange={handleChange('description')}
                            autoFocus={true}
                        ></InputBase>
                    }
                    <div style={{ padding: '10px' }}>
                        {label}
                    </div>
                    <div className='create-note-icon-div'>
                        <div className='create-icons-div'>
                            <Reminder className='icons-padding' />
                            <PersonAdd className='icons-padding' />
                            <Color className='icons-padding'
                                onClick={(event) => menuRef.current.handleClick(event)}
                            // onMouseLeave={() => menuRef.current.handleClose()}
                            />
                            <Image className='icons-padding' />
                            <Archive className='icons-padding' onClick={handleArchive} />
                            <More className='icons-padding'
                                onClick={(event) => lebelMenuRef.current.handleOpenMenu(event)}
                            />
                        </div>
                        <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', textTransform: 'initial' }} onClick={createNoteClose}>Close</Button>
                    </div>
                </div>
            }
            {/* </ClickAwayListener> */}
            <ColorMenu ref={menuRef} />
            <Label ref={lebelMenuRef} />
        </MuiThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        reduxState: {
            state
        }
    }
}
export default connect(mapStateToProps)(TakeNote);
