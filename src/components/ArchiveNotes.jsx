import React, { Component } from 'react'
import '../styles/displayNotes.scss';
import SingleNote from './SingleNote.jsx';
import { connect } from 'react-redux';
import { getNotes, getlabels } from '../actions';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
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

class ArchiveNotes extends Component {

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
        const { classes } = this.props;
        
        let others = this.props.notes.filter(val => {
            return val.isArchived === true;
        });

        const notes = others.map((note, index) => {
            return (
                <SingleNote key={index} note={note} handleGet={this.handleGet} />
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
                </main>
                <div className={this.props.transitionCss}>
                    {!this.props.listGridView ?
                        <div className='display-notes-list'>
                            {notes}
                        </div>
                        :
                        <Masonry className='display-notes'>
                            {notes}
                        </Masonry>
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToMap = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToMap)(withStyles(styles)(ArchiveNotes));