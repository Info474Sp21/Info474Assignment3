import D3Visual from "./D3Visual";
import ScatterPlot from "./ScatterPlot"
import Switch from "react-switch";
import React, { Component } from "react";

export default class VisualSection extends Component {
    constructor() {
      super();
      this.state = { checked: false };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(checked) {
      this.setState({ checked });
    }
  
    render() {
      return (
          <div id="visual-section">
            <label>
            <span>Switch with default style</span>
            <Switch onChange={this.handleChange} checked={this.state.checked} />
            </label>
          </div>
      );
    }
  }