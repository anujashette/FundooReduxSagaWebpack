import React, { Component } from 'react'
import Appbar from './Appbar';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DisplayArea from './DisplayArea';
import DisplayNotes from './DisplayNotes';

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

    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <div>
                <Appbar props={this.props}/>
                <DisplayArea/>
                {/* <DisplayNotes /> */}
            </div>
            </MuiThemeProvider>
        )
    }
}

export default Dashboard
