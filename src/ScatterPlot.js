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
    // Add X axis
    var x = d3.scaleLinear()
        .domain([yValues[xValue]["minVal"], yValues[xValue]["maxVal"]])
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
        .domain([yValues[yValue]["minVal"], yValues[yValue]["maxVal"]])
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

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    var tooltip = d3.select("#scatterplot-vis")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#E0E0E0")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var mouseover = function(d) {
    tooltip
        .style("opacity", 1)
    }
    var mousemove = function(d) {
    tooltip
        .html("Year: " + d['year'] + " <br>" + xValue + ": d[xValue] <br> " + yValue + ": d[yValue]")
        .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[xValue]); } )
        .attr("cy", function (d) { return y(d[yValue]); } )
        .attr("r", 2.5)
        .style("fill", "#1DB954")
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave )
        
    return (
        <div className="scatterplot_container centered">
            <h1 className="centered">React and D3 Interactive Scatter Plot Visualization #2</h1>
            <div id="scatterplot-vis">

            </div>
        </div>
    );
}
export default ScatterPlot;