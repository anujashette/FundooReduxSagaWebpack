import React, { forwardRef, useImperativeHandle } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import '../styles/takeNote.scss';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { getlabels } from '../actions';

const theme = createMuiTheme({
    overrides: {
        MuiPopover: {
            paper: {
                width: 'auto',
                flexDirection: 'column',
                height: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                padding: '5px',
                borderRadius: '5px'
            }
        }
    }
});

const SelectLabel = forwardRef((props, ref) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checked, setChecked] = React.useState([]);


    const handleChange = (data) => event => {

        for (const each of props.labels) {
            if (each.id === data.id) {
                each.isDeleted =  event.target.checked;
            }
        }
        props.dispatch({ type: 'CHECK_LIST', action: props.labels })
    };


    useImperativeHandle(ref, () => ({
        handleOpen(event) {
            setAnchorEl(event.currentTarget);
        }
    }));


    const handleCloseOn = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'more-popover' : undefined;
    console.log('get all labels', props);

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleCloseOn}
                    anchorOrigin={{
                        vertical: 'right',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Typography>Label name</Typography>
                    <FormGroup aria-label="position" column>

                        {props.labels.map((data, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            color="default"
                                            checked={props.labels.isDeleted}
                                            value={data.isDeleted}
                                            onChange={handleChange( data)}
                                        />
                                    }
                                    label={data.label}
                                    labelPlacement="end"
                                />
                            )
                        })}
                    </FormGroup>
                </Popover>
            </MuiThemeProvider>
        </div>
    )
})

const mapSateToProps = (state) => {
    return state;
}
export default connect(mapSateToProps, null, null, { forwardRef: true })(SelectLabel);