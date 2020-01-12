import React from 'react';
import { Snackbar } from '@material-ui/core';

function SnackbarComponent(props) {
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={props.snackbaropen}
                autoHideDuration={3000}
                onClose={()=>props.snackBarClose(props.snackBarMsg)}
                message={<span id="message-id">{props.snackBarMsg}</span>}
            ></Snackbar>
        </div>
    )
}

export default SnackbarComponent;
