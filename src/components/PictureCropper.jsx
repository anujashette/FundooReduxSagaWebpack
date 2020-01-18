import React from 'react';
import { Dialog } from '@material-ui/core';


function PictureCropper() {
    return (
        <MuiThemeProvider theme={theme}>
            <Dialog
                onClose={handleClose}
                open={true}>
                {this.state.src && (
                    <ReactCrop
                        src={this.state.src}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
            </Dialog>
        </MuiThemeProvider>
    )
}

export default PictureCropper;
