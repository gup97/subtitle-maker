import React, { Component } from "react";
class DownloadImage extends Component {
    inputDownloadBtn = (e) => {
        const { href, handleCanvasHref } = this.props;
        const canvasRef = this.props.canvas;
        const canvas = canvasRef.current;
        const url = canvas.toDataURL();
        href !== url && handleCanvasHref(url);
    };
    render() {
        return (
            <a
                onClick={this.inputDownloadBtn}
                href={this.props.href}
                className="download-button"
                download="sample.png">
                Download
            </a>
        );
    }
};

export default DownloadImage;