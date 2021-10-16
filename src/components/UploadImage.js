import React, { Component } from "react";
class UploadImage extends Component {
    inputFile = (e) => {
        const [file] = e.target.files
        if (file) {
            const { imageChange } = this.props;
            const fileURL = URL.createObjectURL(file)
            imageChange(fileURL);
        }
    };
    render() {
        return (
            <div className="upload-tab">
                <input
                    accept="image/*"
                    type='file'
                    id="imgInp"
                    onChange={this.inputFile}
                />
            </div>
        );
    }
};

export default UploadImage;