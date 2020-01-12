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

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function EditNote(props) {
    const classes = useStyles();
    const { handleEditClose, open, note } = props;
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
            // setState();
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
            color: note.currentColor,
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
    // var label = note.labels.map((key, index) => {

    //     if (key.isDeleted && key !== null) {
    //         labelID.push(key.id); ``
    //         return (
    //             <Chip
    //                 key={index}
    //                 label={key.label}
    //                 onDelete={handleDelete(key)}
    //                 deleteIcon={<Cancel style={{ width: "18px", height: "18px" }} />}
    //                 style={{
    //                     height: "20px", maxWidth: "100px"
    //                 }}
    //             />
    //         )
    //     }
    // });

    const handleClose = () => {
        handleEditClose();
    };

    const handleListItemClick = value => {
        handleEditClose(value);
    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>

                <div className='create-note-div' style={{ background: note.currentColor }}>
                    <div className='create-note-card'>
                        <InputBase
                            placeholder='Title'
                            className='input-base-create'
                            value={note.title}
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
                            value={note.description}
                            onChange={handleChange('description')}
                            autoFocus={true}
                        ></InputBase>
                    }
                    <div style={{ padding: '10px' }}>
                        {/* {label} */}
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
                </div>    </Dialog>
            <ColorMenu ref={menuRef} />
            <Label ref={lebelMenuRef} />
        </div>
    );
}

export default EditNote;