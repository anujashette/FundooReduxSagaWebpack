// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider, Typography, Tooltip } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import '../styles/displayNotes.scss';
import Image from '@material-ui/icons/Image';
import Unpin from '../Assets/unpin.svg';
import Pin from '../Assets/pin.svg';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Unarchive from '@material-ui/icons/UnarchiveOutlined';
import Reminder from '@material-ui/icons/NotificationsOutlined';
import PersonAdd from '@material-ui/icons/PersonAddOutlined';
import Color from '@material-ui/icons/ColorLensOutlined';
import More from '@material-ui/icons/MoreVertOutlined';
import NewCheckList from './NewCheckList';
import { connect } from 'react-redux';
import { updateNoteItem, addLabelToNote, trashNote, deleteNote, deleteNoteForever } from '../services/userService';
import ColorMenu from './ColorMenu';
import EditNote from './EditNote';
import Label from './Label';
import Cancel from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const { useRef } = React;
const theme = createMuiTheme({
    overrides: {

    }
})
const useStyles = makeStyles({
    inputTitle: {
        fontSize: 14,
        width: '93%',
        padding: '5px 10px 0 10px'
    },
    svgIcon: {
        width: '17px',
        display: 'flex',
        'justify-content': 'space-evenly',
        padding: ' 0 10px 10px 10px',
        cursor: 'pointer'
    }
});

function SingleNote(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        isPined: false,
        isCheckList: false,
        isArchived: false,
        isEdited: false
    });

    let labelID = [];
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

        updateNoteItem(colorObj, path)
            .then((response) => {
                props.handleGet();
            })
            .catch((error) => {
                // console.log('update color error', error);
            })
        colorMenuRef.current.handleClose();
    }

    const handleSetArchive = () => {
        const archiveObj = {
            isArchived: !props.note.isArchived,
            noteIdList: [props.note.id]
        }
        let path = 'archiveNotes';

        updateNoteItem(archiveObj, path)
            .then((response) => {
                props.handleGet();
            })
            .catch((error) => {
                // console.log('update archive error', error);
            })
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

        updateNoteItem(pinObj, path)
            .then((response) => {
                props.handleGet();
            })
            .catch((error) => {
                // console.log('update pin error', error);
            })
    }

    const handleDeleteForever = () => {
        const noteObj = {
            "noteIdList": [props.note.id]
        }
        deleteNoteForever(noteObj)
        .then((response)=> {
            props.handleGet();
            console.log(response);
        })  
        .catch((error)=> {
            console.log(error);
            
        })
    }

    const handleRestore = () => {
        const noteObj = {
            "isDeleted": false,
            "noteIdList": [props.note.id]
        }
        trashNote(noteObj)
        .then((response)=> {
            props.handleGet();
            console.log(response);
        })  
        .catch((error)=> {
            console.log(error);
            
        })
    }

    var label = props.note.noteLabels.map((key, index) => {
        // console.log('label-', key);

        if (key !== null && !key.isDeleted) {
            // console.log('single note===', props.note.noteLabels);

            // labelID.push(key.id); 
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
                    {values.isCheckList ?
                        <NewCheckList />
                        :
                        <Typography
                            className={classes.inputTitle}
                            onClick={handleEditClose}
                        >{props.note.description}</Typography>
                    }
                    <div style={{ padding: '10px' }}>
                        {label}
                    </div>
                    {!props.note.isDeleted ?

                        <div className='display-icons-div'>
                            <Reminder className='icons-padding' className={classes.svgIcon} />
                            <PersonAdd className='icons-padding' className={classes.svgIcon} />
                            <Color className='icons-padding' className={classes.svgIcon}
                                onClick={changeNoteColor}
                            // onMouseLeave={() => colorMenuRef.current.handleClose()}
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
                                <RestoreFromTrashIcon className='icons-padding' className={classes.svgIcon} onClick={handleRestore}/>
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
