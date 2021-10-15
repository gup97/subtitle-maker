import React, { Component } from "react";


class TextInput extends Component {
    render() {
        return (
            <input className="textInput"
                onChange={this.props.onChange}
                type="text"
                size="40"
                placeholder="Type text here!" />
        );
    }
};

export default TextInput;