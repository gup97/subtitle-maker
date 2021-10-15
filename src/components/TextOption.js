import React, { Component } from "react";


class TextOption extends Component {
    render() {
        return (
            <input type="number"
                value={this.props.fontSize}
                onChange={this.props.onChange}>
            </input>
        );
    }
};

export default TextOption;