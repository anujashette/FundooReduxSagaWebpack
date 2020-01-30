import React, { Component } from 'react';
import '../styles/questionAnswer.scss';
import { getNoteDetails, addQuestionAndAnswer, updateLikeUnLike } from '../services/userService';
import { Button, Divider, IconButton, Tooltip, withStyles, Popper, Fade, Paper, Typography } from '@material-ui/core';
import keep from '../Assets/keep.png';

// Require Editor CSS files.
import '../styles/froala_style.scss';
import '../styles/froala_editor.scss';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import ReplyIcon from "@material-ui/icons/Reply";
import Like from "@material-ui/icons/ThumbUpAlt";
import Dislike from "@material-ui/icons/ThumbUpOutlined";
import StarRatings from "react-star-ratings";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


const styles = theme => {
    return ({
        iconButton: {
            padding: '8px 10px 10px 10px',
            width: '40px',
            height: '40px',
            alignSelf: 'center'
        },
        askButton: {
            textTransform: 'initial',
            background: '#cecece',
            padding: '0',
            float: 'right',
            // margin: '0 20px'
        },
        closeButton: {
            textTransform: 'initial',
            background: ' transparent'
        },
        paper: {
            // border: '1px solid',
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
            background: 'white',
            boxShadow: '0px 1px 4px 0px #888888'
        },
        nested: {
            paddingLeft: theme.spacing(6),
        },
        innerNested: {
            paddingLeft: theme.spacing(12),
        },
        innerInnerNested: {
            paddingLeft: theme.spacing(18),
        }
    })
};

class AnswerList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        console.log('answerList',this.props.answer.id);
        
        const { classes } =this.props
        return (
            <div className='list-div'>
                <div className='answer-message-div'>
                    <img src={keep} className='profile-picture' />
                    <div>
                        <p className='timeDate'>{this.props.answer.user.firstName} {this.props.answer.user.lastName}
                            <span>&nbsp;&nbsp;&nbsp;{this.props.handleDateDisplay(this.props.answer.createdDate)}</span>
                        </p>
                        <p className='answer-p' dangerouslySetInnerHTML={{ __html: this.props.answer.message }} />
                    </div>
                </div>
                <div className='question-icon-div'>
                    {this.props.answerNumber !== 'thirdAnswer' ?
                        <Tooltip title='Reply'>
                            <IconButton
                                className={classes.iconButton}
                                aria-describedby={this.props.id}
                                onClick={this.props.handleClick(this.props.answer.id)}>
                                <ReplyIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        null
                    }
                    {this.props.answer.like.length !== 0 ?
                        this.props.answer.like.map((likeObj, index) => {
                            if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
                                return (<Tooltip title='Dislike' key={index}>
                                    <IconButton className={classes.iconButton} onClick={() => this.props.handleDislike(this.props.answer.id)}>
                                        <Like />
                                    </IconButton>
                                </Tooltip>)
                            } else {
                                return (<Tooltip title='Like' key={index}>
                                    <IconButton className={classes.iconButton} onClick={() => this.props.handleLike(this.props.answer.id)}>
                                        <Dislike />
                                    </IconButton>
                                </Tooltip>)
                            }
                        })
                        :
                        <Tooltip title='Like'>
                            <IconButton className={classes.iconButton} onClick={() => this.props.handleLike(this.props.answer.id)}>
                                <Dislike />
                            </IconButton>
                        </Tooltip>
                    }
                    <p className='answer-like-p'>Likes {this.props.handleLikeCount(this.props.answer)}</p>
                    <span className='rate-p'>
                        <StarRatings
                            rating={this.props.handleRatingAvg(this.props.answer)}
                            starRatedColor='rgb(255, 211, 58)'
                            starHoverColor='rgb(245, 224, 151)'
                            changeRating={(newRating)=>this.props.changeRating(newRating,this.props.answer.id)}
                            // onClick={this.props.handleGetSelectedId(this.props.answer.id)}
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="0px"
                        />
                    </span>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AnswerList)
