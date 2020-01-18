import React, { Component } from 'react'
import Appbar from './Appbar';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import EditLabel from './EditLabel';
import { connect } from 'react-redux';

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
  }

  handleLabelNotesLoad = (labelUrl) => {
  console.log(' handleLabelNotesLoad={props.handleLabelNotesLoad}',labelUrl);
  this.props.history.push(labelUrl);

      this.props.dispatch({type:'CURRENT_CLICKED_LABEL',labelName:   this.props.match.params.labelname.slice(1)});

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

export default connect(mapStateToProps)(Dashboard)
