import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
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
import { requestCreateNote, updateNoteItem } from '../services/userService';
import ColorMenu from './ColorMenu';
import { setColorToRedux, clearLabelCheck, getNotes } from '../actions';
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
        },
        // MuiDialog: {
        //     paperWidthSm: {
        //         // maxWidth: '605px'
        //     }
        // }
    }
});

const useStyles = makeStyles({
    dialogCard: {
        maxWidth: '605px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: 'unset'
        }
    }
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
        color: note.color
    });
    const colorMenuRef = useRef();
    const lebelMenuRef = useRef();

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleCheckList = () => {
        setValues({ ...values, takeNote: false, isCheckList: !values.isCheckList });
    }

    const handleArchive = () => {
        setValues({ ...values, isArchived: !note.isArchived })
        props.handleSetArchive();
    }

    const handleDelete = (key) => {

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
                        height: "20px", maxWidth: "100px"
                    }}
                />
            )
        }
    });

    const handleClose = () => {
        handleEditClose();

        const updateObj = {
            "title": values.title,
            "description": values.description,
            "noteId": note.id
        };
        let path = 'updateNotes';

        updateNoteItem(updateObj, path)
            .then((response) => {
                handleGet();
            })
            .catch((error) => {
                // console.log('update note error', error);
            })
    };

    const handleListItemClick = value => {
        handleEditClose(value);
    };

    const handleSetColor = (selectedColor) => {
        setValues({ ...values, color: selectedColor });

        const colorObj = {
            "color": selectedColor,
            "noteIdList": [note.id]
        };
        let path = 'changesColorNotes';

        updateNoteItem(colorObj, path)
            .then((response) => {
            })
            .catch((error) => {
                // console.log('update color error', error);
            })
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

    return (
        <MuiThemeProvider theme={theme}>
            <Dialog className='dialog-card' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>

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
                    <div style={{ padding: '10px' }}>
                        {label}
                    </div>
                    <div className='create-note-icon-div'>
                        <div className='create-icons-div'>
                            <Reminder className='icons-padding' />
                            <PersonAdd className='icons-padding' />
                            <Color className='icons-padding'
                                onClick={(event) => colorMenuRef.current.handleClick(event)}
                            />
                            <Image className='icons-padding' />
                            <Archive className='icons-padding' onClick={handleArchive} />
                            <More className='icons-padding'
                                onClick={(event) => lebelMenuRef.current.handleOpenMenu(event)}
                            />
                        </div>
                        <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', textTransform: 'initial' }} onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Dialog>
            <ColorMenu ref={colorMenuRef} handleSetColor={handleSetColor} />
            <Label ref={lebelMenuRef} addLabel={props.addLabel} updateLabel={'createdNote'} />
        </MuiThemeProvider>
    );
}

export default connect(null, null)(EditNote);