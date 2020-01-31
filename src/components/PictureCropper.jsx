import ReactDOM from 'react-dom';
import React, { PureComponent, Component } from 'react';
import ReactCrop from 'react-image-crop';
import Camera from '@material-ui/icons/CameraAltOutlined';
// import 'react-image-crop/dist/ReactCrop.css';

import '../styles/cropper.scss';
import { Dialog, Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = theme => {
    return ({
        setButton: {
            textTransform: 'initial',
            background: '#2a5c8e',
            margin: '0 15px 0 0'
        },
        closeButton: {
            textTransform: 'initial',
            background: 'transparent'
        }
    })
}

class PictureCropper extends Component {
    state = {
        src: null,
        crop: {
            unit: 'px',
            width: 100,
            height: 50,
            // aspect: 4 / 4,
        },
        open: false,
        imageUrl: ''
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, open: true })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        console.log('canvas--',canvas.toDataURL('image/png'));

        this.setState({ imageUrl: canvas.toDataURL('image/png') });
        
        // let blob = new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         if (!blob) {
        //             //reject(new Error('Canvas is empty'));
        //             console.error('Canvas is empty');
        //             return;
        //         }
        //         blob.name = fileName;
        //         window.URL.revokeObjectURL(this.fileUrl);
        //         this.fileUrl = window.URL.createObjectURL(blob);

        //         resolve(this.fileUrl);
        //     }, 'image/jpeg');
        // });
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props;
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="App">
                <div>
                    {/* <input type="file" accept="image/*" onChange={this.onSelectFile} /> */}
                    <input id='selector-file' accept="image/*" type="file" onChange={this.onSelectFile} style={{ display: 'none' }} />
                    <label htmlFor="selector-file">
                        <Camera style={{ width: '0.7em' }} >
                        </Camera>
                    </label>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.dialogStyle}>

                    <div style={{ width: '597px', display: 'flex', flexDirection: 'column', border: '#404040 solid 1px' }}>
                        <div className='profle-picture-title'>Set profile photo</div>
                        <div className='subtitle'>To crop this image, drag the region below and then click "Set as profile photo"</div>
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                                style={{
                                    maxWidth: '400px',
                                    minWidth: '100px',
                                    height: '370px',
                                    alignSelf: 'center',
                                    position: 'relative',
                                    top: '25px'
                                }}
                            />
                        )}
                        <Divider />
                        <div className="button-div">
                            <Button size="medium"
                                className={classes.setButton}
                                onClick={() => this.props.handleSetProfile(this.state.imageUrl)}
                            >
                                Set as profile picture
                            </Button>
                            <Button size="medium"
                                className={classes.closeButton}
                                onClick={this.handleClose}
                            >
                                Cancel
                    </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PictureCropper);