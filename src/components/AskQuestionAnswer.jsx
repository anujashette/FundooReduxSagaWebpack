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
            paddingLeft: theme.spacing.unit * 6.5,
        },
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
            open: false
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
                    console.log('array 1', this.state.questionsArray);
                    console.log('array 2', this.state.answerArray);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleExpandClick = () => {
        this.setState(state => ({ open: !state.open }));
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
        console.log('model', this.state.question);
        let questionObj = {
            message: this.state.question,
            notesId: this.state.noteId
        }

        addQuestionAndAnswer(questionObj)
            .then((response) => {
                console.log('response', response);
                this.handleGetNote();
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    changeRating = (newRating) => {
        let rateObj = { rate: newRating };
        let path = 'rate'
        this.handleLikeApi(rateObj, this.state.questionsArray.id, path);
    }

    handleLike = () => {
        let likeObj = {
            like: true
        }
        let path = 'like'
        this.handleLikeApi(likeObj, this.state.questionsArray.id, path);
    }

    handleDislike = () => {
        let likeDislikeObj = {
            like: false
        }
        let path = 'like'
        this.handleLikeApi(likeDislikeObj, this.state.questionsArray.id, path);
    }

    handleLikeApi = (likeUnlikeObj, parentId, path) => {
        updateLikeUnLike(likeUnlikeObj, parentId, path)
            .then((response) => {
                this.handleGetNote();
                console.log('res', response);
            })
            .catch((error) => {
                console.log('error', error);
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

    handleRatingAvg = (questionArray) => {
        let rateAvg = 0;
        try {
            questionArray.rate.map((rateItem) => {
                return rateAvg += rateItem.rate;
            });
            console.log('rate', rateAvg / questionArray.rate.length);
            return rateAvg;
        } catch (error) {
            return rateAvg;
        }
    }

    render() {
        const { classes } = this.props;
        // const [anchorEl, setAnchorEl] = React.useState(null);

        const open = Boolean(this.state.anchorEl);
        const id = open ? 'transitions-popper' : undefined;
        const handleClick = event => {
            console.log('froala');

            this.setState({ anchorEl: this.state.anchorEl ? null : event.currentTarget });
        };

        const froalaEditor = (<Popper open={open} anchorEl={this.state.anchorEl} placement={'bottom'} style={{ width: ' 600px' }}>
            <Paper>
                <Button size="medium"
                    className={classes.closeButton}
                    onClick={handleClick}>
                    Close
                    </Button>
                <FroalaEditorComponent tag='textarea'
                    config={this.config}
                    model={this.state.question}
                    onModelChange={this.handleModelChange}>
                </FroalaEditorComponent>
                <Button size="medium"
                    className={classes.askButton}
                    onClick={this.handleAddQuestion}>
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

                <List>
                    <ListItem button onClick={this.handleExpandClick}>
                        {
                            !this.state.isQuestionAsked ?
                                null
                                :
                                <div className='question-message-div'>
                                    <img src={keep} className='profile-picture' />
                                    <div>
                                        <p className='timeDate'>{this.state.questionsArray.user.firstName} {this.state.questionsArray.user.lastName}
                                            <span>&nbsp;&nbsp;&nbsp;{this.handleDateDisplay(this.state.questionsArray.createdDate)}</span>
                                        </p>
                                        <p className='question-p' dangerouslySetInnerHTML={{ __html: this.state.questionsArray.message }} />
                                    </div>
                                    <div className='question-icon-div'>
                                        <Tooltip title='Reply'>
                                            <IconButton
                                                className={classes.iconButton}
                                                aria-describedby={id}
                                                onClick={handleClick}>
                                                <ReplyIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {this.state.questionsArray.like.length !== 0 ?

                                            this.state.questionsArray.like.map((likeObj, index) => {
                                                if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
                                                    return (<Tooltip title='Dislike' key={index}>
                                                        <IconButton className={classes.iconButton} onClick={this.handleDislike}>
                                                            <Like />
                                                        </IconButton>
                                                    </Tooltip>)
                                                } else {
                                                    return (<Tooltip title='Like' key={index}>
                                                        <IconButton className={classes.iconButton} onClick={this.handleLike}>
                                                            <Dislike />
                                                        </IconButton>
                                                    </Tooltip>)
                                                }
                                            })
                                            :
                                            <Tooltip title='Like'>
                                                <IconButton className={classes.iconButton} onClick={this.handleLike}>
                                                    <Dislike />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        <p className='like-p'>Like {this.handleLikeCount(this.state.questionsArray)}</p>
                                        <span className='like-p'>
                                            <StarRatings
                                                rating={this.handleRatingAvg(this.state.questionsArray)}
                                                starRatedColor='rgb(255, 211, 58)'
                                                starHoverColor='rgb(245, 224, 151)'
                                                changeRating={this.changeRating}
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="0px"
                                            />
                                        </span>
                                    </div>
                                </div>
                        }
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>



                    {this.state.answerArray.map((answer, index) => {
                        console.log('answer', this.state.questionsArray.id, 'answer', answer.parentId);
                        return (<Collapse in={this.state.open} timeout="auto" unmountOnExit key={index}>
                            <List component="div" disablePadding>
                                {this.state.questionsArray.id === answer.parentId ?
                                    <ListItem button className={classes.nested}>
                                        <div className='question-message-div'>
                                            <img src={keep} className='profile-picture' />
                                            <div>
                                                <p className='timeDate'>{answer.user.firstName} {answer.user.lastName}
                                                    <span>&nbsp;&nbsp;&nbsp;{this.handleDateDisplay(answer.createdDate)}</span>
                                                </p>
                                                <p className='question-p' dangerouslySetInnerHTML={{ __html: answer.message }} />
                                            </div>
                                        </div>
                                        <div className='question-icon-div'>
                                            <Tooltip title='Reply'>
                                                <IconButton
                                                    className={classes.iconButton}
                                                    aria-describedby={id}
                                                    onClick={handleClick}>
                                                    <ReplyIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {answer.like.length !== 0 ?
                                                answer.like.map((likeObj, index) => {
                                                    if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
                                                        return (<Tooltip title='Dislike' key={index}>
                                                            <IconButton className={classes.iconButton} onClick={this.handleDislike}>
                                                                <Like />
                                                            </IconButton>
                                                        </Tooltip>)
                                                    } else {
                                                        return (<Tooltip title='Like' key={index}>
                                                            <IconButton className={classes.iconButton} onClick={this.handleLike}>
                                                                <Dislike />
                                                            </IconButton>
                                                        </Tooltip>)
                                                    }
                                                })
                                                :
                                                <Tooltip title='Like'>
                                                    <IconButton className={classes.iconButton} onClick={this.handleLike}>
                                                        <Dislike />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            <p className='like-p'>Like {this.handleLikeCount(answer)}</p>
                                            <span className='like-p'>
                                                <StarRatings
                                                    rating={this.handleRatingAvg(answer)}
                                                    starRatedColor='rgb(255, 211, 58)'
                                                    starHoverColor='rgb(245, 224, 151)'
                                                    changeRating={this.changeRating}
                                                    numberOfStars={5}
                                                    starDimension="20px"
                                                    starSpacing="0px"
                                                />
                                            </span>
                                        </div>
                                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    :
                                    null
                                }

                            </List>
                        </Collapse>)
                    })}





                    {/* {
                                    !this.state.isQuestionAsked ?
                                        null
                                        :
                                        <div className='question-message-div'>
                                            <img src={keep} className='profile-picture' />
                                            <div>
                                                <p className='timeDate'>{this.state.questionsArray.user.firstName} {this.state.questionsArray.user.lastName}
                                                    <span>&nbsp;&nbsp;&nbsp;{this.handleDateDisplay()}</span>
                                                </p>
                                                <p className='question-p' dangerouslySetInnerHTML={{ __html: this.state.questionsArray.message }} />
                                            </div>
                                            <div className='question-icon-div'>
                                                <Tooltip title='Reply'>
                                                    <IconButton
                                                        className={classes.iconButton}
                                                        aria-describedby={id}
                                                        onClick={handleClick}>
                                                        <ReplyIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                {this.state.questionsArray.like.length !== 0 ?

                                                    this.state.questionsArray.like.map((likeObj, index) => {
                                                        if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
                                                            return (<Tooltip title='Dislike' key={index}>
                                                                <IconButton className={classes.iconButton} onClick={this.handleDislike}>
                                                                    <Like />
                                                                </IconButton>
                                                            </Tooltip>)
                                                        } else {
                                                            return (<Tooltip title='Like' key={index}>
                                                                <IconButton className={classes.iconButton} onClick={this.handleLike}>
                                                                    <Dislike />
                                                                </IconButton>
                                                            </Tooltip>)
                                                        }
                                                    })
                                                    :
                                                    <Tooltip title='Like'>
                                                        <IconButton className={classes.iconButton} onClick={this.handleLike}>
                                                            <Dislike />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                <p className='like-p'>Like {this.handleLikeCount(this.state.questionsArray)}</p>
                                                <span className='like-p'>
                                                    <StarRatings
                                                        rating={this.handleRatingAvg(this.state.questionsArray)}
                                                        starRatedColor='rgb(255, 211, 58)'
                                                        starHoverColor='rgb(245, 224, 151)'
                                                        changeRating={this.changeRating}
                                                        numberOfStars={5}
                                                        starDimension="20px"
                                                        starSpacing="0px"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                } */}

                </List>
                {froalaEditor}
            </div >
        )
    }
}

export default withStyles(styles)(AskQuestionAnswer);
