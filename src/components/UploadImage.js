import React, { Component } from "react";


class UploadImage extends Component {

    render() {
        return (
            <div className="upload-tab">
                <input accept="image/*" type='file' id="imgInp"
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
};

export default UploadImage;