import React, { Component } from 'react'
import '../styles/displayNotes.scss';
import SingleNote from './SingleNote.jsx';
import { connect } from 'react-redux';
import { getNotes, getlabels } from '../actions';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 900,
            xl: 1200
        }
    }
});

class DisplayNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet = () => {
        this.props.dispatch(getNotes());
        this.props.dispatch(getlabels());
    }

    render() {
        console.log('display notes===>', this.props);

        let pin = this.props.notes.filter(val => {
            return val.isArchived === false && val.isDeleted === false && val.isPined === true;
        });

        let others = this.props.notes.filter(val => {
            return val.isArchived === false && val.isDeleted === false && val.isPined === false;
        });

        const pinNotes = pin.map((note, index) => {
            return (
                <SingleNote key={index} note={note} />
            )
        });

        const notes = others.map((note, index) => {
            return (
                <SingleNote key={index} note={note} />
            )
        });

        return (
            <MuiThemeProvider theme={theme} >
                <div className={this.props.transitionCss}>
                    {pin.length !== 0 ?
                        <p className='pin-title'>PINNED</p>

                        :
                        null
                    }

                    <div className='display-notes'>
                        {pinNotes}
                    </div>
                    <p className='pin-title'>OTHERS</p>
                    <div className='display-notes'>
                        {notes}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToMap = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToMap)(DisplayNotes);