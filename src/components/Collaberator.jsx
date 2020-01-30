import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider, Avatar, InputBase, Button, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Keep from '../Assets/keep.png';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Done from '@material-ui/icons/Done';
import '../styles/collaberator.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select"; 
import { searchUserList } from '../services/userService';
import { IconButton } from '@material-ui/core';

const styles = theme => {
    return ({
        avatarStyle: {
            margin: '5px 15px 0 5px',
            background: 'white',
            border: ' 1px solid #8a8a8a'
        },
        iconstyle: {
            color: '#8a8a8a'
        },
        inputBaseStyle: {
            width: '200px',
            fontSize: '0.9rem',
            [theme.breakpoints.down('xs')]: {
                width: '140px',
                fontSize: '0.6rem',
            },
        },
        doneIcon: {
            alignSelf: 'center',
            width: '0.7em',
            cursor: 'pointer'
        },
        iconButton: {
            padding: '5px 10px',
            [theme.breakpoints.up('sm')]: {
                marginLeft: '0px',
            }
        },
        divider: {
            margin: '0 15px'
        }
    })
};

let selectedItem = [];

class Collaberator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            userList: [],
            selectedUsers: props.collaborators,
            selectedUser: '',
            open: false
        }
    }

    handleChange = async (event) => {
        await this.setState({ username: event.target.value });
    }

    handleSearch = (event) => {
        event.persist();
        let searchObj = {
            searchWord: this.state.username
        }

        searchUserList(searchObj)
            .then((response) => {
                let sortedList = response.data.data.details.filter((user) => {
                    return localStorage.getItem('email') !== user.email
                });
                this.setState({...this.state, userList: sortedList, open: true });
            })
            .catch((error) => {
            })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSelect = userItem => {
        selectedItem.push(userItem);
        this.setState({...this.state, selectedUsers: selectedItem });
        this.props.handleUpdateCollaborator(userItem);
        this.handleClose();
    };

    handleOnSave = () => {
        this.props.collberatorOnSave();
        this.props.handleCollabrator();
    }

    handleOnCancel = () => {
        this.props.handleCollabrator();
    }

    render() {
        const { classes } = this.props;

        const DropDownList = this.state.userList.map((userItem, index) => {
            return (
                <ListItem key={index} button onClick={() => this.handleSelect(userItem)}>
                    <ListItemText primary={userItem.email} />
                </ListItem>
            )
        });

        const CollaboratorAvatar = this.state.selectedUsers.map((userItem, index) => {
            let nameFirstLetter = userItem.firstName.charAt(0);
            return (<div key={index} className='owner-div'>
                <Avatar style={{ margin: '5px 15px 0 5px' }}>{nameFirstLetter}</Avatar>
                <div className='owner-name-div'>
                    <h5 className='owner-name'>{userItem.firstName + ' ' + userItem.lastName}
                    </h5>
                    <p className='owner-email'>{userItem.email}</p>
                </div>
            </div>);
        });

        return (
            <Card>
                <div className='collabrator-card'>
                    <p className='collab-title'>collaborators</p>
                    <Divider style={{ margin: '0 15px' }} />
                    <div className='owner-div'>
                        <Avatar style={{ margin: '5px 15px 0 5px' }}><img src={Keep}></img></Avatar>
                        <div className='owner-name-div'>
                            <h5 className='owner-name'>{localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')}
                                <span> (Owner)</span></h5>
                            <p className='owner-email'>{localStorage.getItem('email')}</p>
                        </div>
                    </div>
                    {CollaboratorAvatar}
                    <div className='search-div'>
                        <Avatar className={classes.avatarStyle}><PersonAddIcon className={classes.iconstyle} /></Avatar>
                        <div className='input-base'>
                            <InputBase
                                placeholder='Person or email to share with'
                                value={this.state.username}
                                onChange={this.handleChange}
                                className={classes.inputBaseStyle}
                                htmlFor="demo-controlled-open-select-label"
                            />
                            <IconButton className={classes.iconButton} onClick={this.handleSearch}  >
                                <Done className={classes.doneIcon} />
                            </IconButton>
                        </div>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={this.state.open}
                                onClose={this.handleClose}
                                value={this.state.selectedUser  || '' }
                                onChange={this.handleChange}
                                style={{ display: "none" }}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <List component="nav" aria-label="secondary mailbox folders">
                                    {DropDownList}
                                </List>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='bottom-div'>
                        <Button size="medium"
                            style={{ textTransform: 'initial', background: ' transparent' }}
                            onClick={this.handleOnCancel}>
                            Cancel
                        </Button>
                        <Button size="medium"
                            style={{ textTransform: 'initial', background: ' transparent' }}
                            onClick={this.handleOnSave}>
                            Save
                        </Button>
                    </div>
                    <div className='backcolor'>&nbsp;</div>
                </div>
            </Card>
        )
    }
}

const mapStateToMap = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToMap)(withStyles(styles, { withTheme: true })(Collaberator));

