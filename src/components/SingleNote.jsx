// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider, Typography, Tooltip, Avatar, Dialog } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import styled from "styled-components";

import '../styles/displayNotes.scss';
import Image from '@material-ui/icons/Image';
import Unpin from '../Assets/unpin.svg';
import Pin from '../Assets/pin.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Unarchive from '@material-ui/icons/UnarchiveOutlined';
import PersonAdd from '@material-ui/icons/PersonAddOutlined';
import Color from '@material-ui/icons/ColorLensOutlined';
import More from '@material-ui/icons/MoreVertOutlined';
import NewCheckList from './NewCheckList';
import { connect } from 'react-redux';
import { updateNoteItem, addLabelToNote, trashNote, deleteNote, deleteNoteForever, addCollaboratorToNote } from '../services/userService';
import ColorMenu from './ColorMenu';
import EditNote from './EditNote';
import Label from './Label';
import Cancel from '@material-ui/icons/Close';
import WatchLaterOutlined from '@material-ui/icons/WatchLaterOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Reminder from './Reminder';
import Collaberator from './Collaberator';

const { useRef } = React;
const theme = createMuiTheme({
    overrides: {

    }
})
const useStyles = makeStyles({
    inputTitle: {
        fontSize: 14,
        width: '93%',
        padding: '5px 10px 0 10px',
        wordBreak: 'break-all'
    },
    svgIcon: {
        width: '17px',
        display: 'flex',
        'justify-content': 'space-evenly',
        padding: ' 0 10px 10px 10px',
        cursor: 'pointer'
    },
    dialogCard: {
        maxWidth: '600px',
        padding:'0px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: 'unset'
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

function SingleNote(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        isPined: false,
        isCheckList: false,
        isArchived: false,
        isEdited: false,
        noteId: props.note.id,
        open: false,
        collaboratedUser : [] 
    });

    const MyChip = props => (
        <StyledChip
            {...props}
            clickable={false}
            avatar={<WatchLaterOutlined style={{ width: "13px", height: "13px" }} />}
            onDelete={() => updateItem({
                noteIdList: [values.noteId]
            }, 'removeReminderNotes')}
            deleteIcon={<Cancel style={{ width: "13px", height: "13px" }} />}
            onClick={() => console.log("I did something")}
        />
    );

    const colorMenuRef = useRef();
    const labelMenuRef = useRef();

    const handleCheckList = () => {
        setValues({ ...values, isCheckList: !values.isCheckList });
    }

    const handleEditClose = () => {
        setValues({ ...values, isEdited: !values.isEdited })
    }

    const changeNoteColor = async (event) => {
        colorMenuRef.current.handleClick(event);
    }

    const handleSetColor = (selectedColor) => {
        const colorObj = {
            "color": selectedColor,
            "noteIdList": [props.note.id]
        };

        let path = 'changesColorNotes';

        updateItem(colorObj, path);
        colorMenuRef.current.handleClose();
    }

    const handleSetArchive = () => {
        const archiveObj = {
            isArchived: !props.note.isArchived,
            noteIdList: [props.note.id]
        }
        let path = 'archiveNotes';

        updateItem(archiveObj, path);

    }

    const handleDelete = (labelData) => {

    }

    const addLabel = (selectedLabelId) => {

        let labelObj = {
            noteId: props.note.id,
            labelId: selectedLabelId
        }

        addLabelToNote(labelObj)
            .then((response) => {
                props.handleGet();
            })
            .catch((error) => {
                // console.log('update color error', error);
            })
    }

    const handleSetPin = () => {

        const pinObj = {
            isPined: !props.note.isPined,
            noteIdList: [props.note.id]
        }

        let path = 'pinUnpinNotes';

        updateItem(pinObj, path);

    }

    const handleDeleteForever = () => {
        const noteObj = {
            "noteIdList": [props.note.id]
        }
        deleteNoteForever(noteObj)
            .then((response) => {
                props.handleGet();
                console.log(response);
            })
            .catch((error) => {
                console.log(error);

            })
    }

    const handleRestore = () => {
        const noteObj = {
            "isDeleted": false,
            "noteIdList": [props.note.id]
        }
        trashNote(noteObj)
            .then((response) => {
                props.handleGet();
                console.log(response);
            })
            .catch((error) => {
                console.log(error);

            })
    }

    const handleSetReminder = (dateAndTime) => {
        const reminderObj = {
            reminder: dateAndTime,
            noteIdList: [props.note.id]
        }

        let path = 'addUpdateReminderNotes';
        updateItem(reminderObj, path);
    }

    const handleUpdateCollaborator = (selectedUser) =>{
        console.log('in single-->', props.note);

        addCollaboratorToNote(selectedUser, props.note.id)
        .then((response)=>{
            console.log(response);
            
        })
        .catch((error)=>{
            console.log(error);
            
        });
        // handleCollabrator();
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

    const handleCollaberator = () => {
        console.log('collab');
        
        setValues({ ...values, open: !values.open });
    }

    let CollaberatorAvatar = props.note.collaborators.map((userItem, index)=>{
        let nameFirstLetter = userItem.firstName.charAt(0);
        return ( <Avatar style={{ margin: '5px 15px 0 5px',  background: props.note.color}}>{nameFirstLetter}</Avatar>
        )
    });

    var reminderChip = props.note.reminder.map((reminder, index) => {
        let date = JSON.stringify(reminder);
        let day = new Date(date).getDate();
        let month = new Date(date).toLocaleString( 'default', { month: 'short' });
        let hours = new Date(date).getHours();
        let minutes = new Date(date).getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;

        return (<MyChip
            key={index}
            label={`${day} ${month} ,  ${hours}:${minutes}`}
            style={{
                backgroundColor: '#f4f4f4',
                alignSelf: 'center',
                height:'20px',
                fontSize:'0.6rem',
                textDecoration : new Date(date) < new Date() ? 'line-through' : 'none'
            }} 
            />)
    });

    var label = props.note.noteLabels.map((key, index) => {

        if (key !== null && !key.isDeleted) {
            return (
                <Chip
                    key={key.id}
                    label={key.label}
                    onDelete={handleDelete(key)}
                    deleteIcon={<Cancel style={{ width: "18px", height: "18px" }} />}
                    style={{
                        height: "20px", maxWidth: "100px",
                        backgroundColor: '#f4f4f4'
                    }}
                />
            )
        }
    });

    return (
        <MuiThemeProvider theme={theme}>
            {!values.isEdited ?
                <Card id={props.reduxState.state.displayCardList} style={{ background: props.note.color }}>
                    <div className='create-note-card'>
                        <Typography
                            className={classes.inputTitle}
                            onClick={handleEditClose}
                        >{props.note.title}</Typography>

                        {props.note.isPined ?
                            <img src={Pin} className='pin-icon' onClick={handleSetPin} />
                            :
                            <img src={Unpin} className='pin-icon' onClick={handleSetPin} />
                        }
                    </div>
                    { values.isCheckList ?
                        <NewCheckList />
                        :
                        <Typography
                            className={classes.inputTitle}
                            onClick={handleEditClose}
                        >{props.note.description}</Typography>
                    }
                    <div style={{ padding: '10px' }}>
                        {label}
                        {reminderChip}
                        {CollaberatorAvatar}
                    </div>
                    {!props.note.isDeleted ?

                        <div className='display-icons-div'>
                            <Reminder
                                handleSetReminder={handleSetReminder}
                            />

                            <PersonAdd className='icons-padding' className={classes.svgIcon} onClick={handleCollaberator} />
                            <Dialog onClose={handleCollaberator} aria-labelledby="simple-dialog-title" open={values.open}>
                                <Collaberator 
                                handleCollabrator={handleCollaberator}
                                handleUpdateCollaborator={handleUpdateCollaborator}/>
                            </Dialog>
                            
                            <Color className='icons-padding' className={classes.svgIcon}
                                onClick={changeNoteColor}
                            />
                            <Image className='icons-padding' className={classes.svgIcon} />
                            {props.note.isArchived ?
                                <Tooltip title='Unarchive'>
                                    <Unarchive className='icons-padding' className={classes.svgIcon} onClick={handleSetArchive} />
                                </Tooltip>
                                :
                                <Tooltip title='Archive'>
                                    <Archive className='icons-padding' className={classes.svgIcon} onClick={handleSetArchive} />
                                </Tooltip>
                            }
                            <More className='icons-padding' className={classes.svgIcon}
                                onClick={(event) => labelMenuRef.current.handleOpenMenu(event)}
                            />
                        </div>
                        :
                        <div className='display-bin-icons-div'>
                            <Tooltip title='Delete forever'>
                                <DeleteForeverIcon className='icons-padding' className={classes.svgIcon} onClick={handleDeleteForever} />
                            </Tooltip>
                            <Tooltip title='Restore'>
                                <RestoreFromTrashIcon className='icons-padding' className={classes.svgIcon} onClick={handleRestore} />
                            </Tooltip>
                        </div>
                    }
                </Card>
                :
                <EditNote
                    handleEditClose={handleEditClose}
                    open={values.isEdited}
                    note={props.note}
                    addLabel={addLabel}
                    handleSetArchive={handleSetArchive}
                    handleGet={props.handleGet}
                />
            }

            <ColorMenu
                ref={colorMenuRef}
                handleSetColor={handleSetColor} />

            <Label
                ref={labelMenuRef}
                addLabel={addLabel}
                updateLabel={'createdNote'}
                note={props.note}
                handleGet={props.handleGet}
            />
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

export default connect(mapStateToProps)(SingleNote);
