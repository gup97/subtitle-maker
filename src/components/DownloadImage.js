import React, { Component } from "react";


class DownloadImage extends Component {
    render() {
        return (
            <a
                onClick={this.props.onClick}
                href={this.props.href}
                className="download-button"
                download="sample.png">
                Download
            </a>
        );
    }
};

export default DownloadImage;