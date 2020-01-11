import React, { Component } from 'react'
import '../styles/displayNotes.scss';
import SingleNote from './SingleNote.jsx';
import { connect } from 'react-redux';
import { getNotes, getlabels } from '../actions';

class DisplayNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    componentDidMount () {
        this.handleGet()
    }

    handleGet = () => {
        this.props.dispatch(getNotes());
        this.props.dispatch(getlabels());
    }

    render() {
        const notes = this.props.notes.map((note, index)=> {
            return (
                <SingleNote key={index} note={note}/>
            )
        });

        return (
            <div className='display-notes'>
                {notes}
                {/* <SingleNote/> */}
            </div>
        )
    }
}

const mapStateToMap = (reduxState) => {    
    return reduxState;
}

export default connect(mapStateToMap)(DisplayNotes);