import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import {  MenuItem } from '@material-ui/core';
import '../styles/takeNote.scss';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import SelectLabel from './SelectLabel';
import { trashNote } from '../services/userService';
import { getNotes } from '../actions';

const theme = createMuiTheme({
    overrides: {
        MuiPopover: {
            paper: {
                width: '110px',
                height: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                padding: '5px',
                borderRadius: '5px'
            }
        }
    }
});

const Label = forwardRef((props, ref) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const labelRef = useRef();

    useImperativeHandle(ref, () => ({
        handleOpenMenu(event) {
            setAnchorEl(event.currentTarget);
        }
    }));

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDeleteNote = () => {
        const noteObj = {
            "isDeleted": true,
            "noteIdList": [props.note.id]
        }
        trashNote(noteObj)
        .then((response)=> {
            props.handleGet();
            console.log(response);
            handleClose();
        })  
        .catch((error)=> {
            console.log(error);
            
        })
    }

    const open = Boolean(anchorEl);
    const id = open ? 'more-popover' : undefined;

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onMouseEnter={(event) => labelRef.current.handleOpen(event)}>Add Label<ArrowRightIcon /></MenuItem>
                    <MenuItem onMouseEnter={handleDeleteNote}>Delete Note</MenuItem>
                </Popover>
                <SelectLabel
                    ref={labelRef}
                    addLabel={props.addLabel}
                    updateLabel={props.updateLabel}
                    handleClose={handleClose}
                />

            </MuiThemeProvider>
        </div>
    )
});

export default connect(null, null, null, { forwardRef: true })(Label);
