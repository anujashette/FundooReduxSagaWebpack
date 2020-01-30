import React, { Component } from 'react';
import '../styles/questionAnswer.scss';
import { getNoteDetails, addQuestionAndAnswer, updateLikeUnLike, updateLikeReplyRate } from '../services/userService';
import { Button, Divider, IconButton, Tooltip, Popper, withStyles, Fade, Paper, Typography } from '@material-ui/core';
import keep from '../Assets/keep.png';
// import { withStyles } from '@material-ui/styles';

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
import AnswerList from './AnswerList';

const styles = theme => {
    return ({
        iconButton: {
            padding: '8px 10px 10px 10px',
            width: '40px',
            height: '40px',
            alignSelf: 'center',
            [theme.breakpoints.up('md')]: {
                padding: '4px 5px 5px 5px',
                width: '30px',
            }
        },
        askButton: {
            textTransform: 'initial',
            background: '#cecece',
            padding: '0',
            float: 'right',
        },
        closeButton: {
            textTransform: 'initial',
            background: ' transparent'
        },
        paper: {
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
            background: 'white',
            boxShadow: '0px 1px 4px 0px #888888'
        },
        list: {
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(0.5),
            },   
        },
        nested: {
            paddingLeft: theme.spacing(6),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
            },
        },
        innerNested: {
            paddingLeft: theme.spacing(6),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(4),
            },
        },
        innerInnerNested: {
            paddingLeft: theme.spacing(6),
        },
        popperStyle:{
            width: '600px',
            [theme.breakpoints.down('xs')]: {
                width:'97%',
            },
        }
    })
};

class AskQuestionAnswer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            noteId: this.props.match.params.noteId,
            noteDetails: [],
            isQuestionAsked: false,
            question: '',
            questionsArray: [],
            answerArray: [],
            anchorEl: null,
            openLayer: true,
            openFirstLayer: true,
            openSecondLayer: true,
            reply: '',
            selectedParentId: ''
        }
    }

    componentDidMount() {
        this.handleGetNote();
    }

    handleGetNote = () => {
        getNoteDetails(this.state.noteId)
            .then((response) => {
                let noteDetail = response.data.data.data[0]
                this.setState({ noteDetails: noteDetail });

                if (noteDetail.questionAndAnswerNotes.length > 0) {
                    this.setState({
                        questionsArray: noteDetail.questionAndAnswerNotes.shift(),
                        answerArray: noteDetail.questionAndAnswerNotes,
                        isQuestionAsked: true,
                    });
                }
            })
            .catch((error) => {
            })
    }

    handleExpandClick = (value, stateValue) => {
        this.setState(state => ({ [value]: !stateValue }));
    };

    handleDateDisplay = (dateAndTime) => {
        let date = new Date(dateAndTime).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
        let time = new Date(dateAndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        return (date + ',' + time)
    }

    handleClose = () => {
        this.props.history.goBack();
    }

    handleModelChange = (model) => {
        this.setState({
            question: model
        });
    }

    handleAddQuestion = () => {
        let questionObj = {
            message: this.state.question,
            notesId: this.state.noteId
        }

        addQuestionAndAnswer(questionObj)
            .then((response) => {
                this.handleGetNote();
            })
            .catch((error) => {
            })
    }

    handleReplyChange = (model) => {
        this.setState({
            reply: model
        });
    }

    handleAddReply = () => {
        if (this.state.reply.length > 0) {
            let replyObj = {
                message: this.state.reply
            }
            let path = 'reply'
            this.handleLikeApi(replyObj, this.state.selectedParentId, path);
        }
        this.setState({ anchorEl: null })
    }

    handleLike = (parentId) => {
        let likeObj = {
            like: true
        }
        let path = 'like'
        this.handleLikeApi(likeObj, parentId, path);
    }

    handleDislike = (parentId) => {
        let likeDislikeObj = {
            like: false
        }
        let path = 'like'
        this.handleLikeApi(likeDislikeObj, parentId, path);
    }

    handleLikeApi = (likeUnlikeObj, parentId, path) => {
        updateLikeReplyRate(likeUnlikeObj, parentId, path)
            .then((response) => {
                this.handleGetNote();
            })
            .catch((error) => {
            })
    }

    handleLikeCount = (questionArray) => {
        let likes = 0;
        try {
            questionArray.like.map((likeItem) => {
                if (likeItem.like) {
                    return likes += 1;
                }
            });
            return likes;
        }
        catch (error) {
            return likes;
        }
    }

    changeRating = (newRating, selectedId) => {
        let rateObj = { rate: newRating };
        let path = 'rate'
        this.handleLikeApi(rateObj, selectedId, path);
    }

    handleClick = (parentId) => event => {
        this.setState({ anchorEl: this.state.anchorEl ? null : event.currentTarget, selectedParentId: parentId });
    };

    handleRatingAvg = (questionArray) => {
        let rateAvg = 0;
        try {
            questionArray.rate.map((rateItem) => {
                return rateAvg += rateItem.rate;
            });

            if (rateAvg !== 0) {
                rateAvg = rateAvg / questionArray.rate.length;
                return Math.abs(rateAvg);
            }
            else {
                return rateAvg;
            }
        } catch (error) {
            return rateAvg;
        }
    }

    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'transitions-popper' : undefined;

        const froalaEditor = (<Popper open={open} anchorEl={this.state.anchorEl} placement={'bottom-end'} className={classes.popperStyle}>
            <Paper>
                <Button size="medium"
                    className={classes.closeButton}
                    onClick={this.handleClick()}>
                    Close
                    </Button>
                <FroalaEditorComponent tag='textarea'
                    config={this.config}
                    model={this.state.reply}
                    onModelChange={this.handleReplyChange}>
                </FroalaEditorComponent>
                <Button size="medium"
                    className={classes.askButton}
                    onClick={this.handleAddReply}
                >
                    Reply
                </Button>
            </Paper>
        </Popper>)

        return (
            <div className='question-answer-main'>
                <div className='title-button-div'>
                    <h4>{this.state.noteDetails.title}</h4>
                    <Button size="medium"
                        className={classes.closeButton}
                        onClick={this.handleClose}>
                        Close
                        </Button>
                </div>
                <p className='description-p'>{this.state.noteDetails.description}</p>
                {this.state.isQuestionAsked ?
                    <div className='question-div'>
                        <Divider />
                        <h4>Question Asked</h4>
                        <p className='question-p' dangerouslySetInnerHTML={{ __html: this.state.questionsArray.message }} />
                        <Divider />
                    </div>
                    :
                    <span>
                        <FroalaEditorComponent tag='textarea'
                            config={this.config}
                            model={this.state.question}
                            onModelChange={this.handleModelChange}>
                        </FroalaEditorComponent>
                        <Button size="medium"
                            className={classes.askButton}
                            onClick={this.handleAddQuestion}>
                            Ask
                    </Button>
                    </span>
                }

                {!this.state.isQuestionAsked ?
                    null
                    :
                    <List>
                        <ListItem className={classes.list}>
                            <AnswerList
                                answer={this.state.questionsArray}
                                handleDateDisplay={this.handleDateDisplay}
                                answerNumber={'question'}
                                id={id}
                                handleClick={this.handleClick}
                                handleLikeCount={this.handleLikeCount}
                                handleLike={this.handleLike}
                                handleDislike={this.handleDislike}
                                handleRatingAvg={this.handleRatingAvg}
                                changeRating={this.changeRating}
                                handleAddReply={this.handleAddReply}
                            />
                            {this.state.openLayer ?
                                <ExpandLess style={{ cursor: 'pointer' }} onClick={() => this.handleExpandClick('openLayer', this.state.openLayer)} />
                                : <ExpandMore style={{ cursor: 'pointer' }} onClick={() => this.handleExpandClick('openLayer', this.state.openLayer)} />}

                        </ListItem>

                        {/* First answer array */}
                        {this.state.answerArray.map((answer, index) => {

                            return (<Collapse in={this.state.openLayer} timeout="auto" unmountOnExit key={index}>
                                <List component="div" disablePadding>
                                    {this.state.questionsArray.id === answer.parentId && answer.isApproved === true ?
                                        <div>
                                            < ListItem className={classes.nested}>
                                                <AnswerList
                                                    answer={answer}
                                                    handleDateDisplay={this.handleDateDisplay}
                                                    answerNumber={'firstAnswer'}
                                                    id={id}
                                                    handleClick={this.handleClick}
                                                    handleLikeCount={this.handleLikeCount}
                                                    handleLike={this.handleLike}
                                                    handleDislike={this.handleDislike}
                                                    handleRatingAvg={this.handleRatingAvg}
                                                    changeRating={this.changeRating}
                                                    handleAddReply={this.handleAddReply}
                                                />

                                                {this.state.openFirstLayer ?
                                                    <ExpandLess style={{ cursor: 'pointer' }} onClick={() => this.handleExpandClick('openFirstLayer', this.state.openFirstLayer)} />
                                                    : <ExpandMore style={{ cursor: 'pointer' }} onClick={() => this.handleExpandClick('openFirstLayer', this.state.openFirstLayer)} />}
                                            </ListItem>

                                            <div>
                                                {/* Second answer array */}
                                                {this.state.answerArray.map((secondAnswer, index) => {
                                                    return (<Collapse in={this.state.openFirstLayer} timeout="auto" unmountOnExit key={index}>
                                                        <List component="div" disablePadding>
                                                            {answer.isApproved === true && answer.id === secondAnswer.parentId ?
                                                                <div>
                                                                    <ListItem className={classes.innerNested}>
                                                                        <AnswerList
                                                                            answer={secondAnswer}
                                                                            handleDateDisplay={this.handleDateDisplay}
                                                                            answerNumber={'secondAnswer'}
                                                                            id={id}
                                                                            handleClick={this.handleClick}
                                                                            handleLikeCount={this.handleLikeCount}
                                                                            handleLike={this.handleLike}
                                                                            handleDislike={this.handleDislike}
                                                                            handleRatingAvg={this.handleRatingAvg}
                                                                            changeRating={this.changeRating}
                                                                            handleAddReply={this.handleAddReply}
                                                                        />
                                                                        {this.state.openSecondLayer ?
                                                                            <ExpandLess style={{ cursor: 'pointer' }} onClick={() => this.handleExpandClick('openSecondLayer', this.state.openSecondLayer)} />
                                                                            : <ExpandMore style={{ cursor: 'pointer' }} onClick={() => this.handleExpandClick('openSecondLayer', this.state.openSecondLayer)} />}
                                                                    </ListItem>
                                                                    <div className='third-answer-layer'>
                                                                        {/* Third answer array */}
                                                                        {this.state.answerArray.map((thirdAnswer, index) => {
                                                                            return (<Collapse in={this.state.openSecondLayer} timeout="auto" unmountOnExit key={index}>
                                                                                <List component="div" disablePadding>
                                                                                    {answer.isApproved === true && secondAnswer.id === thirdAnswer.parentId ?
                                                                                        <ListItem className={classes.innerInnerNested}>
                                                                                            <AnswerList
                                                                                                answer={thirdAnswer}
                                                                                                handleDateDisplay={this.handleDateDisplay}
                                                                                                answerNumber={'thirdAnswer'}
                                                                                                id={id}
                                                                                                handleClick={this.handleClick}
                                                                                                handleLikeCount={this.handleLikeCount}
                                                                                                handleLike={this.handleLike}
                                                                                                handleDislike={this.handleDislike}
                                                                                                handleRatingAvg={this.handleRatingAvg}
                                                                                                changeRating={this.changeRating}
                                                                                                handleAddReply={this.handleAddReply}
                                                                                            />
                                                                                            {/* { this.state.openThirdLayer ? <ExpandLess style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} /> : <ExpandMore style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} />} */}
                                                                                        </ListItem>
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                </List>
                                                                            </Collapse>)
                                                                        })}
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </List>
                                                    </Collapse>)
                                                })}

                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </List>
                            </Collapse>)
                        })}
                    </List>
                }
                {froalaEditor}
            </div >
        )
    }
}
export default (withStyles(styles, { withTheme: true })(AskQuestionAnswer));



