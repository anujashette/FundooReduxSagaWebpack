import React, { Component } from 'react'
import Appbar from './Appbar';
class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Appbar props={this.props}/>
            </div>
        )
    }
}

export default Dashboard
