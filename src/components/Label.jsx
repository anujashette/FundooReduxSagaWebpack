import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Avatar, MenuItem } from '@material-ui/core';
import '../styles/takeNote.scss';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import SelectLabel from './SelectLabel';

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

    console.log('label---', props);

    const handleClose = () => {
        setAnchorEl(null);
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
                    <MenuItem onMouseEnter={(event) => labelRef.current.handleOpen(event)}>Add Label <ArrowRightIcon /></MenuItem>

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
