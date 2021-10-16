import React, { Component } from "react";


class TextOption extends Component {
    render() {
        return (
            <div>
                <span>text size : </span>
                <input type="number"
                    value={this.props.fontSize}
                    onChange={this.props.onChange}>
                </input>
            </div>
        );
    }
};

export default TextOption;