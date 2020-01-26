import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { InputBase, createMuiTheme, MuiThemeProvider, Button, Chip, Tooltip, Avatar } from '@material-ui/core';
import '../styles/displayNotes.scss';
// import '../styles/takeNote.scss';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import List from '@material-ui/icons/List'
import Cancel from '@material-ui/icons/Close'
import Image from '@material-ui/icons/Image'
import Unpin from '../Assets/unpin.svg';
import Pin from '../Assets/pin.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
// import Reminder from '@material-ui/icons/NotificationsOutlined'
import PersonAdd from '@material-ui/icons/PersonAddOutlined'
import Color from '@material-ui/icons/ColorLensOutlined';
import More from '@material-ui/icons/MoreVertOutlined';
import NewCheckList from './NewCheckList';
import { connect } from 'react-redux';
import { updateNoteItem, addCollaboratorToNote } from '../services/userService';
import ColorMenu from './ColorMenu';
import Label from './Label';
import Collaberator from './Collaberator';
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

const useStyles = makeStyles({
    dialogCard: {
        maxWidth: '605px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: 'unset'
        }
    },
});

function EditNote(props) {
    const classes = useStyles();
    const { handleEditClose, open, note, handleGet } = props;
    const [values, setValues] = useState({
        takeNote: true,
        isPined: note.isPined,
        isCheckList: false,
        title: note.title,
        description: note.description,
        isArchived: note.isArchived,
        color: note.color,
        collaberatorClick: false
    });
    const colorMenuRef = useRef();
    const lebelMenuRef = useRef();
    const MyChip = props => (
        <StyledChip
            {...props}
            clickable={false}
            avatar={<WatchLaterOutlined style={{ width: "13px", height: "13px" }} />}
            onDelete={() => updateItem({
                noteIdList: [note.id]
            }, 'removeReminderNotes')}
            deleteIcon={<Cancel style={{ width: "13px", height: "13px" }} />}
            onClick={() => console.log("I did something")}
        />
    );

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleCheckList = () => {
        setValues({ ...values, takeNote: false, isCheckList: !values.isCheckList });
    };

    const handleListItemClick = value => {
        handleEditClose(value);
    };

    const handleArchive = () => {
        setValues({ ...values, isArchived: !note.isArchived })
        props.handleSetArchive();
    }

    const handleDelete = (key) => {

    }

    const handleClose = () => {
        handleEditClose();

        const updateObj = {
            "title": values.title,
            "description": values.description,
            "noteId": note.id
        };
        let path = 'updateNotes';
        updateItem(updateObj, path);
    };

    const handleSetColor = (selectedColor) => {
        setValues({ ...values, color: selectedColor });

        const colorObj = {
            "color": selectedColor,
            "noteIdList": [note.id]
        };
        let path = 'changesColorNotes';
        updateItem(colorObj, path);
        colorMenuRef.current.handleClose();
    }

    const handleSetPin = () => {
        setValues({ ...values, isPined: !values.isPined });

        const pinObj = {
            isPined: !note.isPined,
            noteIdList: [note.id]
        }
        let path = 'pinUnpinNotes';
        updateNoteItem(pinObj, path)
            .then((response) => {
            })
            .catch((error) => {
                // console.log('update pin error', error);
            })
    }

    const handleSetReminder = (dateAndTime) => {
        const reminderObj = {
            reminder: dateAndTime,
            noteIdList: [note.id]
        }
        let path = 'addUpdateReminderNotes';
        updateItem(reminderObj, path);
    }

    const handleCollaberator = () => {
        setValues({ ...values, collaberatorClick: !values.collaberatorClick })
        console.log('collb click', values.collaberatorClick);
    }

    const handleUpdateCollaborator = (selectedUser) => {
        addCollaboratorToNote(selectedUser, props.note.id)
            .then((response) => {
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const collberatorOnSave = () => {
        handleCollaberator();
    }

    const updateItem = (dataObject, path) => {
        updateNoteItem(dataObject, path)
            .then((response) => {
                props.handleGet();
            })
            .catch((error) => {
                console.log('update pin error', error);
            })
    }

    var label = note.noteLabels.map((key, index) => {
        if (key !== null && !key.isDeleted) {
            return (
                <Chip
                    key={index}
                    label={key.label}
                    onDelete={handleDelete(key)}
                    deleteIcon={<Cancel style={{ width: "18px", height: "18px" }} />}
                    style={{
                        height: "20px", maxWidth: "100px", marginTop: ' 18px'
                    }}
                />
            )
        }
    });

    let CollaberatorAvatar = props.note.collaborators.map((userItem, index) => {
        let nameFirstLetter = userItem.firstName.charAt(0);
        return (
            <Tooltip title={userItem.email} key={index}>
                <Avatar style={{
                    margin: '5px 2.5px 5px 2.5px',
                    background: props.note.color,
                    boxShadow: '0px 1px 5px 0px #000000',
                    color: '#000000'
                }}>{nameFirstLetter}</Avatar>
            </Tooltip>
        )
    });

    var reminderChip = props.note.reminder.map((reminder, index) => {
        let date = JSON.stringify(reminder);
        let day = new Date(date).getDate();
        let month = new Date(date).toLocaleString('default', { month: 'short' });
        let hours = new Date(date).getHours();
        let minutes = new Date(date).getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;

        return (<MyChip
            key={index}
            label={`${day} ${month} ,  ${hours}:${minutes}`}
            style={{
                backgroundColor: '#f4f4f4',
                alignSelf: 'center',
                height: '20px',
                fontSize: '0.6rem',
                textDecoration: new Date(date) < new Date() ? 'line-through' : 'none'
            }}
        />)
    });

    return (
        <MuiThemeProvider theme={theme}>
            <Dialog className='dialog-card' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                {!values.collaberatorClick ?
                    <div className='edit-note-div' style={{ background: values.color }}>
                        <div className='create-note-card'>
                            <InputBase
                                placeholder='Title'
                                className='input-base-create'
                                value={values.title}
                                onChange={handleChange('title')}
                            ></InputBase>

                            {values.isPined ?
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
                        <div className='edit-label-area'>
                            {label}
                            {CollaberatorAvatar}
                            {reminderChip}
                        </div>
                        <div className='create-note-icon-div'>
                            <div className='create-icons-div'>
                                <Reminder padding='0px'
                                    handleSetReminder={handleSetReminder}
                                />
                                <PersonAdd  onClick={handleCollaberator} />
                                <Color 
                                    onClick={(event) => colorMenuRef.current.handleClick(event)}
                                />
                                <Image  />
                                <Archive  onClick={handleArchive} />
                                <More 
                                    onClick={(event) => lebelMenuRef.current.handleOpenMenu(event)}
                                />
                            </div>
                            <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', textTransform: 'initial' }} onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                    :
                    <Collaberator
                        handleCollabrator={handleCollaberator}
                        handleUpdateCollaborator={handleUpdateCollaborator}
                        collberatorOnSave={handleGet}
                    />
                }
            </Dialog>
            <ColorMenu ref={colorMenuRef} handleSetColor={handleSetColor} />
            <Label ref={lebelMenuRef} addLabel={props.addLabel} updateLabel={'createdNote'} />
        </MuiThemeProvider>
    );
}

export default connect(null, null)(EditNote);