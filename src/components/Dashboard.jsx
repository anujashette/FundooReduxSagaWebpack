import React, { Component } from 'react'
import Appbar from './Appbar';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import EditLabel from './EditLabel';
import { connect } from 'react-redux';
import { requestGetLabelNotes, setLabelName } from '../actions';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.handleLabelNotes(this.props.match.params[0].slice(8));
  }

  handleLabelNotes = (labelName) => {
    this.props.dispatch(requestGetLabelNotes(labelName));
    this.props.dispatch(setLabelName(labelName));
  }

  handleLabelNotesLoad = (labelName) => {
    this.props.history.push(`/dashboard/*/label:${labelName}`);
    this.handleLabelNotes(labelName);
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Appbar
          props={this.props}
          handleLabelNotesLoad={this.handleLabelNotesLoad} />
        {this.props.state.editLabelDialog ?
          <EditLabel ></EditLabel>
          :
          null
        }
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(Dashboard);
