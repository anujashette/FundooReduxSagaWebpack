import React, { Component } from 'react';
import '../styles/questionAnswer.scss';
import { getNoteDetails } from '../services/userService';
import { Button, Divider } from '@material-ui/core';

// Require Editor CSS files.
import '../styles/froala_style.scss';
import '../styles/froala_editor.scss';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditor from 'froala-editor/js/froala_editor.min';

class AskQuestionAnswer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            noteId: this.props.match.params.noteId,
            noteDetails: [],
            isQuestionAsked: false,
            model: 'Example text'
        }
        // this.handleModelChange = this.handleModelChange.bind(this);

    }

    componentDidMount() {
        getNoteDetails(this.state.noteId)
            .then((response) => {                
                this.setState({ noteDetails: response.data.data.data[0] })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleClose = () => {
        this.props.history.push('/dashboard/*/notes')
    }


    handleModelChange= (model) => {
        this.setState({
          model: model
        });
      }
    

    render() {
        console.log('res',this.state.noteDetails);

        return (
            <div className='question-answer-main'>
                <div className='title-button-div'>
                    <h4>{this.state.noteDetails.title}</h4>
                    <Button size="medium"
                        style={{ textTransform: 'initial', background: ' transparent' }}
                        onClick={this.handleClose}>
                        Close
                        </Button>
                </div>
                <p className='description-p'>{this.state.noteDetails.description}</p>
                {this.state.isQuestionAsked ?
                    <FroalaEditorComponent tag='textarea'>
                        <FroalaEditor
                            tag='textarea'
                            config={this.config}
                            model={this.state.model}
                            onModelChange={this.handleModelChange}
                        />
                    </FroalaEditorComponent>
                    :
                    <div className='question-div'>
                    <Divider/>
                    <h4>Question asked</h4>
                    <Divider/>
                    </div>
                }

                <div>

                </div>
            </div>
        )
    }
}

export default AskQuestionAnswer
