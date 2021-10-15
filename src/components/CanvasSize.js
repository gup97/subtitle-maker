import React, { Component } from "react";

class CanvasSize extends Component {

    render() {
        return <div className="sizeTab">
            <input name="width" type="number" value={this.props.width} onChange={this.props.onChange}></input>
            <input name="height" type="number" value={this.props.height} onChange={this.props.onChange}></input>
        </div >
    }
}
export default CanvasSize;