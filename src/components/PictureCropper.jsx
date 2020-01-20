import ReactDOM from 'react-dom';
import React, { PureComponent, Component } from 'react';
import ReactCrop from 'react-image-crop';
import Camera from '@material-ui/icons/CameraAltOutlined';

import '../styles/cropper.scss';
import { Dialog } from '@material-ui/core';

class PictureCropper extends Component {
    state = {
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 16 / 9,
        },
        open:false
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, open:true})
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

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    handleClose = () => {
        this.setState({open:false})
    }

    render() {
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
                <Dialog open={this.state.open} onClose={this.handleClose}>
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        style={{width:'70%', height:'400px'}}
                    />
                )}
                {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                )}
                </Dialog>
            </div>
        );
    }
}

export default PictureCropper;