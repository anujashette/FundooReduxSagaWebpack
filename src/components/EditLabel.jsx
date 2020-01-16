import React, { Component } from 'react';
import { Dialog, InputBase, Divider, DialogContent, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, createMuiTheme, MuiThemeProvider, Button } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import Done from '@material-ui/icons/Done';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import LabelUpdate from './LabelUpdate';
import '../styles/label.scss';
import { createLabel } from '../services/userService';
import { getlabels } from '../actions';

const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                "width": " auto",
                "height": "auto",
                "max-width": "300px",
                "border-radius": "10px"
            }
        },
        MuiBackdrop: {
            root: {
                "position": "relative",
                "touch-action": "none",
                "background-color": "rgba(0, 0, 0, 0.0)",
                "-webkit-tap-highlight-color": "transparent"
            }
        }
    }
})

class EditLabel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openLabel: this.props.state.editLabelDialog,
            label: '',
            labelArray: this.props.labelData,
            isHover: false,
            labelClick: ''
        }
    }

    componentDidMount() {

    }

    handleChange = (e) => {
        let label = e.target.value
        this.setState({ label: label });
    }

    handleClose = () => {
        this.setState({ labelEditor: false, label: '' })
        this.props.dispatch({ type: 'EDIT_LABEL_OPEN', editLabelDialog: false });

    }

    OpenEditor = () => {
        this.setState({ labelEditor: true })
    }

    handleCreate = () => {
        let labelData = {
            "label":this.state.label ,
            "isDeleted":false,
            "userId": localStorage.getItem('userId')
          }
        createLabel(labelData)
        .then((response)=>{
            this.getLabelList();
        })
        .catch((error)=>{

        });
        this.setState({ label: '', labelEditor: false })

    }
    getLabelList = () => {
        this.props.dispatch(getlabels());
        console.log("EditLabel", this.props.state);

    }
    handleLabel = () => {
        
    }

    render() {
        if (this.props.state.labels) {
            var labels = this.props.state.labels.map((key, index) => {
                if (!key.isDeleted) {
                    return (
                        <LabelUpdate
                        getLabelList={this.getLabelList}
                            labelData={key}
                            key={index} />)
                }
                else
                    return null
            })
        }

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Dialog
                        open={this.state.openLabel}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <div className="edit-label">
                            <DialogContent>Edit labels</DialogContent>
                            <ListItem
                                style={{ cursor: "pointer", display: "flex" }}>
                                <Tooltip title="Cancel">
                                    <ListItemIcon onClick={this.handleClose}>< Close /></ListItemIcon>
                                </Tooltip>
                                <InputBase
                                    multiline
                                    placeholder="+ create new label"
                                    value={this.state.label}
                                    name="Label"
                                    onChange={e => this.handleChange(e)}
                                    type="label"
                                    style={{ color: "#434343", fontSize: "15px", padding: "5px" }}
                                ></InputBase>
                                <Tooltip title="Create label">

                                    <IconButton onClick={this.handleCreate} style={{ justifyContent: "flex-end" }}><Done /></IconButton>
                                </Tooltip>
                            </ListItem>
                            <div className="label-edit-div">
                                {labels}
                            </div>
                        </div>

                        <Divider />
                        <div className="edit-label-button">
                        <Button size="medium" onClick={this.handleClose}>
                            Done
                        </Button>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}
export default connect(mapStateToProps)(EditLabel);