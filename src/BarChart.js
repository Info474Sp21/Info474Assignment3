import React, {
    useState,
    useCallback,
    useEffect,
    Component
  } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        let accessToRef = d3.select(this.myRef.current);
        accessToRef.style("background-color", "red");
    }

    render() {
        return <div ref={this.myRef}> Testing Refs </div>
    }
}