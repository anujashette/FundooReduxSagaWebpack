import React, { Component } from 'react'
import '../styles/displayNotes.scss';
import SingleNote from './SingleNote.jsx';
import { connect } from 'react-redux';
import { getNotes, getlabels } from '../actions';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import TakeNote from './TakeNote';
import clsx from 'clsx';
import Masonry from 'react-masonry-component';


const styles = theme => {
    return ({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -'240px',
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
            //  [theme.breakpoints.up('sm')]: {
            //         display: 'none',
            //     },
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    })
};
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
        this.props.dispatch(getlabels());
        this.props.dispatch(getNotes());
    }

    render() {
        
        const { classes } = this.props;

        var pin = this.props.notes.filter(val => {
            return val.isArchived === false && val.isDeleted === false && val.isPined === true;
        });

        var others = this.props.notes.filter(val => {
            return val.isArchived === false && val.isDeleted === false && val.isPined === false;
        });

        const pinNotes = pin.map((note, index) => {
            return (
                <SingleNote key={index} note={note} handleGet={this.handleGet} props={this.props}/>
            )
        });

        const notes = others.map((note, index) => {
            return (
                <SingleNote key={index} note={note} handleGet={this.handleGet} props={this.props}/>
            )
        });

        return (
            <MuiThemeProvider theme={theme} >
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div className={classes.drawerHeader} />
                    <TakeNote props={this.props} />

                </main>
                {!this.props.listGridView ?
                    <div className={this.props.transitionCss}>
                        {pin.length !== 0 ?
                            <p className='pin-title-list'>PINNED</p>
                            :
                            null
                        }

                        <div className='display-notes-list'>
                            {pinNotes}
                        </div>
                        <p className='pin-title-list'>OTHERS</p>
                        <div className='display-notes-list'>
                            {notes}
                        </div>
                    </div>
                    :
                    <div className={this.props.transitionCss}>
                        {pin.length !== 0 ?
                            <p className='pin-title'>PINNED</p>
                            :
                            null
                        }
                        <Masonry className='display-notes'>
                            {pinNotes}
                        </Masonry>
                        {pin.length !== 0 ?
                            <p className='pin-title'>OTHERS</p>
                            :
                            null
                        }
                        <Masonry className='display-notes'>
                            {notes}
                        </Masonry>
                    </div>
                }
            </MuiThemeProvider>
        )
    }
}

const mapStateToMap = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToMap)(withStyles(styles)(DisplayNotes));