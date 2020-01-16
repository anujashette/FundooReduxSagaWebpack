import React from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import '../styles/takeNote.scss';
import { connect } from 'react-redux';
import { setColorToRedux } from '../actions/index';
const theme = createMuiTheme({
    overrides: {
        MuiPopover: {
            paper: {
                width: '93px',
                height: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                padding: '5px',
                borderRadius: '10px'
            }
        }
    }
})
const { forwardRef, useImperativeHandle } = React;

const ColorMenu = forwardRef((props, ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState(['#ffffff', '#91ffaf', '#ff9191',
        '#ffcc91',
        '#efff91',
        '#91edff',
        '#91a3ff',
        '#e791ff',
        '#c72c65',
    ]);

    useImperativeHandle(ref, () => ({
        handleClick(event) {
            // console.log(color);

            setAnchorEl(event.currentTarget);
        },

        handleClose() {
            setAnchorEl(null);
        }
    }));

    const handleCloseOn = () => {
        setAnchorEl(null);
    };

    // const handleSetColor = (selectedColor) => {
    //     // console.log('props', selectedColor);
    //     props.dispatch(setColorToRedux(selectedColor))
    //     handleCloseOn()
    // }

    const open = Boolean(anchorEl);
    const id = open ? 'color-popover' : undefined;

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onMouseLeave={handleCloseOn}
                    onClose={handleCloseOn}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {color.map((color, index) => {
                        return <Avatar key={index} style={{ border: '0.5px solid rgb(156, 156, 156)', backgroundColor: color, color: color, width: '30px', height: '30px' }}
                            onClick={() => props.handleSetColor(color)}
                        ></Avatar>
                    })}
                </Popover>
            </MuiThemeProvider>
        </div>
    );
})

export default connect(null, null, null, { forwardRef: true })(ColorMenu);