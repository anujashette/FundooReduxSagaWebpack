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
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import Color from '@material-ui/icons/ColorLensOutlined';
import More from '@material-ui/icons/MoreVertOutlined';
import NewCheckList from './NewCheckList';
import { connect } from 'react-redux';
import { requestCreateNote } from '../services/userService';
import ColorMenu from './ColorMenu';
import { setColorToRedux, clearLabelCheck, getNotes } from '../actions';
import Label from './Label';
import Reminder from './Reminder';
import styled from "styled-components";
import WatchLaterOutlined from '@material-ui/icons/WatchLaterOutlined';
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
                fontWeight: '600',
                wordBreak: 'break-all'
            }
        }
    }
});

const StyledChip = styled(Chip)`
  &.MuiChip-root {
    background-color: #f4f4f4;
    color: darkblue;
  }
  & .MuiChip-deleteIcon {
    color: default;
    margin-left: 8px;
  }

  & .MuiChip-label {
    font-size: 10px;
    font-family: "Work Sans";
    padding-left: 14px;
    padding-right: 4px;
  }
`;


function TakeNote(props) {
    const [values, setValues] = useState({
        takeNote: true,
        isPin: false,
        isCheckList: false,
        title: '',
        description: '',
        isArchived: false,
        reminder: ''
    });
    const colorMenuRef = useRef();
    const lebelMenuRef = useRef();
    let labelID = [];
    const MyChip = props => (
        <StyledChip
            {...props}
            clickable={false}
            avatar={<WatchLaterOutlined style={{ width: "13px", height: "13px" }} />}
            onDelete={() => deleteReminder()}
            deleteIcon={<Cancel style={{ width: "13px", height: "13px" }} />}
            onClick={() => console.log("I did something")}
        />
    );

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

    const getFormData = (noteObj) => {
		const formData = [];
		for (const property in noteObj) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(noteObj[property]);
			formData.push(encodedKey + "=" + encodedValue);
		}
		return formData.join("&");
	}

    const setState = () => {
        // labelID = JSON.stringify(labelID)
        const formData = new FormData();
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
            labelIdList: JSON.stringify(labelID),
            // checklist: '',
            reminder:values.reminder,
            isPined: values.isPin,
            isArchived: values.isArchived,
            color: props.reduxState.state.currentColor,
            // collaberators: ''
        }
        let convertObj = getFormData(noteObj)

        // formData.append('title', values.title)
        // formData.append('description', values.description)
        // formData.append('labelIdList', [labelID])
        // formData.append('isPined', values.isPin)
        // formData.append('isArchived', values.isArchived)
        // formData.append('color', props.reduxState.state.currentColor)
        // formData.append('reminder', values.reminder)
        //    let formData = jtoF(noteObj)

        requestCreateNote(convertObj)
            .then((response) => {
                clearState();
                props.dispatch(getNotes());
            })
            .catch((error) => {
                clearState();
            })
    }

    const handleDelete = (key) => {

    }

    const deleteReminder = () => {
        setValues({ ...values, reminder: '' })
    }

    const clearState = () => {
        setValues({ ...values, takeNote: true, isCheckList: false, title: '', description: '', isArchived: false, isPin: false, reminder: '' });
        labelID = [];
        props.dispatch(clearLabelCheck())
    }

    const handleSetReminder = (dateAndTime) => {
        setValues({ ...values, reminder: dateAndTime });
    }

    var label = props.reduxState.state.labels.map((key, index) => {

        if (key.isDeleted && key !== null) {
            labelID.push(key.id);
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

    const handleSetColor = (selectedColor) => {
        props.dispatch(setColorToRedux(selectedColor))
        colorMenuRef.current.handleClose()
    }

    const setReminder = () => {
        let date = values.reminder;
        let day = new Date(date).getDate();
        let month = new Date(date).toLocaleString('default', { month: 'short' });
        let hours = new Date(date).getHours();
        let minutes = new Date(date).getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;
        if (values.reminder.length !== 0) {            
            return (<MyChip
                label={`${day} ${month} ,  ${hours}:${minutes}`}
                style={{
                    backgroundColor: '#f4f4f4',
                    alignSelf: 'center',
                    height: '20px',
                    fontSize: '0.6rem',
                    textDecoration: new Date(date) < new Date() ? 'line-through' : 'none'
                }}
            />)
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            {/* <ClickAwayListener onClickAway={createNoteClose}> */}
            {values.takeNote ?
                <div className={props.reduxState.state.transitionTakeNote} >
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
                <div className={props.reduxState.state.transitionCreateNote} style={{ background: props.reduxState.state.currentColor }}>
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
                        {setReminder()}
                    </div>
                    <div className='create-note-icon-div'>
                        <div className='create-icons-div'>
                            <Reminder padding='6px 5px 0px 10px'
                                handleSetReminder={handleSetReminder} />
                            <PersonAdd className='icons-padding' />
                            <Color className='icons-padding'
                                onClick={(event) => colorMenuRef.current.handleClick(event)}
                            // onMouseLeave={() => colorMenuRef.current.handleClose()}
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
            <ColorMenu ref={colorMenuRef} handleSetColor={handleSetColor} />
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
