import React, { Component } from 'react';
import '../styles/questionAnswer.scss';
import { getNoteDetails, addQuestionAndAnswer, updateLikeUnLike } from '../services/userService';
import { Button, Divider, IconButton, Tooltip, withStyles } from '@material-ui/core';
import keep from '../Assets/keep.png';

// Require Editor CSS files.
import '../styles/froala_style.scss';
import '../styles/froala_editor.scss';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import ReplyIcon from "@material-ui/icons/Reply";
import Like from "@material-ui/icons/ThumbUpAlt";
import Dislike from "@material-ui/icons/ThumbUpOutlined";
import StarRatings from "react-star-ratings";

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
            rate: 0,
            likes: 0,
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

    handleDateDisplay = () => {
        let date = new Date(this.state.questionsArray.createdDate).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
        let time = new Date(this.state.questionsArray.createdDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
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
        this.setState({
            rate: newRating
        });
    }

    handleLike = () => {
        let likeObj = {
            like: true
        }
        this.handleLikeApi(likeObj);
    }

    handleDislike = () => {
        let likeDislikeObj = {
            like: false
        }
        this.handleLikeApi(likeDislikeObj);
    }

    handleLikeApi = (likeUnlikeObj) => {
        updateLikeUnLike(likeUnlikeObj, this.state.questionsArray.id)
            .then((response) => {
                this.handleGetNote();
                console.log('res', response);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    render() {
        const { classes } = this.props;
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
                    <div className='question-message-div'>
                        <img src={keep} className='profile-picture' />
                        <div>
                            <p className='timeDate'>{this.state.questionsArray.firstName} {this.state.questionsArray.lastName}
                                <span>&nbsp;&nbsp;&nbsp;{this.handleDateDisplay()}</span>
                            </p>
                            <p className='question-p' dangerouslySetInnerHTML={{ __html: this.state.questionsArray.message }} />
                        </div>
                        <div className='question-icon-div'>
                            <Tooltip title='Reply'>
                                <IconButton className={classes.iconButton}><ReplyIcon /></IconButton>
                            </Tooltip>
                            {this.state.questionsArray.like.length !== 0 ?

                                this.state.questionsArray.like.map((likeObj, index) => {
                                    if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
                                        return (<Tooltip title='Dislike'>
                                            <IconButton className={classes.iconButton} onClick={this.handleDislike}><Like /></IconButton>
                                        </Tooltip>)
                                    } else {
                                        return (<Tooltip title='Like'>
                                            <IconButton className={classes.iconButton} onClick={this.handleLike}><Dislike /></IconButton>
                                        </Tooltip>)
                                    }
                                })
                                :
                                <Tooltip title='Like'>
                                    <IconButton className={classes.iconButton} onClick={this.handleLike}><Dislike /></IconButton>
                                </Tooltip>
                            }

                            <p className='like-p'>Like {this.state.likes}</p>
                            <span className='like-p'>
                                <StarRatings
                                    rating={this.state.rate}
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
            </div>
        )
    }
}

export default withStyles(styles)(AskQuestionAnswer);
