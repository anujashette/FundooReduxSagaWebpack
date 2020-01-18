import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip, InputBase } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import LabelIcon from '@material-ui/icons/Label'
import Done from '@material-ui/icons/Done'
import { updateLabel, deleteLabel } from '../services/userService';
import { getlabels } from '../actions';
import { connect } from 'react-redux';

class LabelUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            labelData: props.labelData,
            renameLabel: false,
            label: props.labelData.label
        }
    }

    componentDidMount() {
        this.props.dispatch(getlabels());
    }

    labelDelete = () => {

        deleteLabel(this.state.labelData.id)
            .then((response) => {
                this.props.getLabelList();
                this.props.handleDeletLabel(this.state.labelData.id)

            })
            .catch((error) => {

            });

    }


    handleChange = (e) => {

        const label = e.target.value
        this.setState({ label: label });
    }

    onMouseEnterHandler = () => {
        this.setState({
            isHover: true
        });
    }

    onMouseLeaveHandler = () => {
        this.setState({
            isHover: false
        });
    }

    handleUpdate = () => {
        this.setState({ renameLabel: false })
        let labelData = {
            label: this.state.label
        }
        updateLabel(labelData, this.state.labelData.id)
            .then((response) => {
                this.props.getLabelList();
            })
            .catch((error) => {

            });
    }

    handleRename = () => {
        this.setState({ renameLabel: true })
    }

    render() {

        return (
            <div>
                <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                    <ListItem
                        // onClick={this.handleEditLabel} 
                        // className={this.state.onClickCss}
                        style={{ cursor: "pointer", display: "flex" }}>
                        {this.state.isHover ?
                            <Tooltip title="Delete label">
                                <ListItemIcon onClick={this.labelDelete}><Delete /></ListItemIcon>
                            </Tooltip>
                            :
                            <ListItemIcon ><LabelIcon /></ListItemIcon>
                        }
                        {this.state.renameLabel ?
                            <InputBase
                                multiline
                                placeholder="Rename label"
                                value={this.state.label}
                                name="Label"
                                onChange={e => this.handleChange(e)}
                                autoFocus
                                style={{ color: "#434343", fontSize: "15px", padding: "5px" }}
                            ></InputBase>
                            :
                            <ListItemText onClick={this.handleRename} primary={this.state.label} />
                        }
                        {this.state.renameLabel ?
                            <Tooltip title="Remame label">
                                <ListItemIcon onClick={this.handleUpdate} style={{ justifyContent: "flex-end" }}><Done /></ListItemIcon>
                            </Tooltip>
                            :
                            <Tooltip title="Remame label">
                                <ListItemIcon onClick={this.handleRename} style={{ justifyContent: "flex-end" }}><Edit /></ListItemIcon>
                            </Tooltip>
                        }
                    </ListItem>
                </div>
            </div>
        );
    }
}

export default connect()(LabelUpdate);