import React, { Component, useState, useEffect } from 'react'
import './style.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {Button, InputLabel, Menu, Select} from '@material-ui/core';
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


const filters = {
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
    const [xFilter, setXFilter] = useState("danceability")
    const [yFilter, setYFilter] = useState("popularity")
    const [startYear, setStartYear] = useState(1921)
    const [endYear, setEndYear] = useState(2020)
    const [anchorEl, setAnchorEl] = useState(null);
    const [minOfXCat, setMinOfXCat] = useState(0.41445);
    const [maxOfXCat, setMaxOfXCat] = useState(0.69291);
    const [minOfYCat, setMinOfYCat] = useState(0.14);
    const [maxOfYCat, setMaxOfYCat] = useState(65.3);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleXFilter = (e) => { 
        console.log("change x filter: " + e.target.value);

        setXFilter(e.target.value);
        console.log(xFilter);
        console.log(yFilter);
        var tempArr = [];
        for (var t = 0; t < data.length; t++) {
            tempArr.push(data[t][e.target.value]);
        }
        setMinOfXCat(Math.min.apply(Math, tempArr));
        setMaxOfXCat(Math.max.apply(Math, tempArr));
    };

    const handleYFilterChange = (e) => { 
        console.log("change y filter: " + e.target.value);
        
        setYFilter(e.target.value);
        console.log(xFilter);
        console.log(yFilter);
        var tempArr = [];
        for (var t = 0; t < data.length; t++) {
            tempArr.push(data[t][e.target.value]);
        }
        setMinOfYCat(Math.min.apply(Math, tempArr));
        setMaxOfYCat(Math.max.apply(Math, tempArr));
    };

    const handleSliderChange = (e, v) => {
        console.log("set years to: " + v);
        setStartYear(v[0]);
        setEndYear(v[1]);
    };

    const useStyles = makeStyles({
        select: {
            background: "#FFFFFF",
            width: "300px",
            '&:before': {
                background: "#FFFFFF",
            },
            '&:after': {
                background: "#FFFFFF",
            }
        },
        label: {
            color: "#FFFFFF"
        }
    })
    const classes = useStyles();
   

    console.log("Scatter plot being called");
    // var xFilter = xFilter;
    // var yFilter = yFilter;
    var screenWidth = window.innerWidth;
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = screenWidth * .8 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    d3.select("#scatterplot-vis").selectAll("*").remove();
    const svg = d3.select("#scatterplot-vis")
        .append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Add X axis
    var x = d3.scaleLinear()
        //.domain([yFilters[xFilter]["minVal"]*.98, yFilters[xFilter]["maxVal"]*1.02])
        .domain([minOfXCat, maxOfXCat])
        .range([ 0, width ]);
    // Add X Axis Label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('stroke', 'white')
        .attr('fill', 'white')
        .attr('x', innerWidth / 2 + margin.left / 2)
        .attr('y', 390)
        .text(xFilter);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
       // .domain([yFilters[yFilter]["minVal"]*.98, yFilters[yFilter]["maxVal"]*1.02])
        .domain([maxOfYCat, minOfYCat])
        .range([ height, 0]);
    // Add y Xxis Label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('stroke', 'white')
        .attr('fill', 'white')
        .attr('x', -innerHeight / 2 - margin.top)
        .attr('y', -48)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yFilter);
    svg.append("g")
        .call(d3.axisLeft(y));
    // Add the tooltip container to the vis container
    // it's invisible and its position/contents are defined during mouseover
    d3.select(".tooltip").remove();
    var tooltip = d3.select("#vis_container").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(event, d) {
        var html  = "year: " + d.year + "<br/>" + xFilter + ": " + d[xFilter] + "<br/>" + yFilter + ": " + d[yFilter];
        d3.select(this).attr("r", 5).style("fill", "white");
        tooltip.html(html)
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 28) + "px")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .transition()
            .duration(350)
            .style("opacity", 1);

    };
    // tooltip mouseout event handler
    var tipMouseout = function(event, d) {
        d3.select(this).attr("r", 2.5).style("fill", "#1DB954");
        tooltip.transition()
            .duration(250)
            .style("opacity", 0);
    };
   
    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function (d) { return x(d[xFilter]); } )
        .attr("cy", function (d) { return y(d[yFilter]); } )
        .attr("r", 2.5)
        .style("fill", "#1DB954")
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);
        
    return (
        <div className="scatterplot_container" id="vis_container">
            <h1 className="centered">React and D3 Interactive Scatter Plot Visualization #2</h1>
            {/* <div id="scatterplot-vis"> */}
            <div className="filters centered" >
            <h2>Change Filters</h2>
                    <InputLabel className={classes.label} >X-Axis</InputLabel>
                    <Select
                        value={xFilter}
                        onChange={handleXFilter}
                        variant="outlined"
                        className={classes.select}
                    >
                        <MenuItem value="danceability" >Danceability</MenuItem>
                        <MenuItem value="acousticness" >Acousticness</MenuItem>
                        <MenuItem value="liveness" >Liveness</MenuItem>
                        <MenuItem value="popularity" >Popularity</MenuItem>
                        <MenuItem value="tempo" >Tempo</MenuItem>
                        <MenuItem value="valence" >Valence</MenuItem>
                        <MenuItem value="speechiness" >Speechiness</MenuItem>
                        <MenuItem value="instrumentalness" >Instrumentalness</MenuItem>
                        <MenuItem value="energy" >Energy</MenuItem>
                        <MenuItem value="duration_ms" >Duration(ms)</MenuItem>
                    </Select>
                    <InputLabel className={classes.label}>Y-Axis</InputLabel>
                    <Select
                        value={yFilter}
                        onChange={handleYFilterChange}
                        variant="outlined"
                        className={classes.select}
                    >
                        <MenuItem value="danceability" >Danceability</MenuItem>
                        <MenuItem value="acousticness" >Acousticness</MenuItem>
                        <MenuItem value="liveness" >Liveness</MenuItem>
                        <MenuItem value="popularity" >Popularity</MenuItem>
                        <MenuItem value="tempo" >Tempo</MenuItem>
                        <MenuItem value="valence" >Valence</MenuItem>
                        <MenuItem value="speechiness" >Speechiness</MenuItem>
                        <MenuItem value="instrumentalness" >Instrumentalness</MenuItem>
                        <MenuItem value="energy" >Energy</MenuItem>
                        <MenuItem value="duration_ms" >Duration(ms)</MenuItem>
                    </Select>
            </div>
            <svg id="scatterplot-vis" className="svg-canvas" width={width} height={height + margin.top * 6} />
            
        </div>
    );
}
export default ScatterPlot;