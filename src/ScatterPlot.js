import React, { Component, useState } from 'react'
import './style.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {Button, Menu} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useFetch } from "../hooks/useFetch"
import { extent, max, min, bin } from "d3-array";
import { Axis, Orient } from "d3-axis-for-react";
import { scaleLinear } from "d3-scale";
import * as d3 from "d3";
import d3Tip from "d3-tip";


const yValues = {
    "acousticness" : {
        "name":"acousticness",
        "scale":100,
        "minVal":0.22,
        "maxVal":0.96,
        "description": "How acoustic the songs in year are on a scale of 0.0 to 1.0."
    },
    "danceability" : {
        "name":"danceability",
        "scale":100,
        "minVal":0.41,
        "maxVal":0.69,
        "description": "How suitable the songs in year are for dancing on a scale of 0.0 to 1.0."
    },
    "duration_ms" : {
        "name":"duration_ms",
        "scale":100,
        "minVal":157000,
        "maxVal":268000,
        "description": "Average time duration of songs in year in ms."
    },
    "energy" : {
        "name":"energy",
        "scale":100,
        "minVal":0.21,
        "maxVal":0.68,
        "description": "How energetic the songs in year are on a scale of 0.0 to 1.0."
    },
    "instrumentalness" : {
        "name":"instrumentalness",
        "scale":100,
        "minVal":0.02,
        "maxVal":0.58,
        "description": "Ratio of instrumental sounds on a scale of 0.0 to 1.0."
    },
    "liveness" : {
        "name":"liveness",
        "scale":100,
        "minVal":0.17,
        "maxVal":0.26,
        "description": "Audience presence on a scale of 0.0 to 1.0."
    },
    "speechiness" : {
        "name":"speechiness",
        "scale":100,
        "minVal":0.05,
        "maxVal":0.49,
        "description": "Spoken words ratio on a scale of 0.0 to 1.0."
    },
    "tempo" : {
        "name":"tempo",
        "scale":100,
        "minVal":101,
        "maxVal":124,
        "description": "Tempo of songs in year in BPM on a scale of 0.0 to 160."
    },
    "valence" : {
        "name":"valence",
        "scale":100,
        "minVal":0.38,
        "maxVal":0.66,
        "description": "Positivity of songs in year on a scale of 0.0 to 1.0."
    },
    "popularity" : {
        "name":"popularity",
        "scale":100,
        "minVal":0.14,
        "maxVal":65.3,
        "description": "Popularity of songs in year on a scale of 0.0 to 100.0."
    },
    "year" : {
        "name":"year",
        "scale":100,
        "minVal":1920,
        "maxVal":2020,
        "description": "The year of the songs"
    }
}

function ScatterPlot() {
    const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"
    //state stuff
    const [data, loading] = useFetch(
        dataByYearURL
    );
    console.log("Scatter plot being called");
    var xValue = "valence";
    var yValue = "popularity";
    var screenWidth = window.innerWidth;
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = screenWidth * .8 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select("#scatterplot-vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // svg = d3.select('.svg-canvas')
        // svg.selectAll("*").remove()
    // Add X axis
    var x = d3.scaleLinear()
        .domain([yValues[xValue]["minVal"]*.98, yValues[xValue]["maxVal"]*1.02])
        .range([ 0, width ]);
    // Add X Axis Label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('stroke', 'white')
        .attr('fill', 'white')
        .attr('x', innerWidth / 2 + margin.left/2)
        .attr('y', 390)
        .text(xValue);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([yValues[yValue]["minVal"]*.98, yValues[yValue]["maxVal"]*1.02])
        .range([ height, 0]);
    // Add y Xxis Label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('stroke', 'white')
        .attr('fill', 'white')
        .attr('x', -innerHeight / 2 - margin.top)
        .attr('y', -40)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yValue);
    svg.append("g")
        .call(d3.axisLeft(y));
  
    // // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[xValue]); } )
        .attr("cy", function (d) { return y(d[yValue]); } )
        .attr("r", 2.5)
        .style("fill", "#1DB954")
        
    return (
        <div className="scatterplot_container centered">
            <h1 className="centered">React and D3 Interactive Scatter Plot Visualization #2</h1>
            <svg id="scatterplot-vis" className="svg-canvas" width={width} height={height + margin.top * 6} />
            {/* <div id="scatterplot-vis">
            This causes duplicate things to show up. But works well with the tooltip
            </div> */}
        </div>
    );
}
export default ScatterPlot;