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
import { Axis, Orient } from "d3-axis-for-react"
import { scaleLinear } from "d3-scale";

const AirbnbSlider = withStyles({
    root: {
      color: '#3a8589',
      height: 3,
      padding: '13px 0',
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
      boxShadow: '#ebebeb 0 2px 2px',
      '&:focus, &:hover, &$active': {
        boxShadow: '#ccc 0 2px 3px 1px',
      },
      '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: '#d8d8d8',
      opacity: 1,
      height: 3,
    },
  })(Slider);

//   Scale for these values is still unknown
const yValues = {
    "acousticness" : {
        "name":"acousticness",
        "scale":100,
        "minVal":0.22,
        "maxVal":0.96,
        "description": "how acoustic the songs in year are"
    },
    "danceability" : {
        "name":"danceability",
        "scale":100,
        "minVal":0.41,
        "maxVal":0.69,
        "description": "how suitable the songs in year are for dancing"
    },
    "duration_ms" : {
        "name":"duration_ms",
        "scale":100,
        "minVal":157000,
        "maxVal":268000,
        "description": "average time duration of songs in year in ms"
    },
    "energy" : {
        "name":"energy",
        "scale":100,
        "minVal":0.21,
        "maxVal":0.68,
        "description": "how energetic the songs in year are"
    },
    "instrumentalness" : {
        "name":"instrumentalness",
        "scale":100,
        "minVal":0.02,
        "maxVal":0.58,
        "description": "ratio of instrumental sounds"
    },
    "liveness" : {
        "name":"liveness",
        "scale":100,
        "minVal":0.17,
        "maxVal":0.26,
        "description": "audience presence"
    },
    "speechiness" : {
        "name":"speechiness",
        "scale":100,
        "minVal":0.05,
        "maxVal":0.49,
        "description": "spoken words ratio"
    },
    "tempo" : {
        "name":"tempo",
        "scale":100,
        "minVal":101,
        "maxVal":124,
        "description": "tempo of songs in year in BPM"
    },
    "valence" : {
        "name":"valence",
        "scale":100,
        "minVal":0.38,
        "maxVal":0.66,
        "description": "positivity of songs in year"
    },
    "popularity" : {
        "name":"popularity",
        "scale":100,
        "minVal":0.14,
        "maxVal":65.3,
        "description": "popularity of songs in year"
    },
}

function D3Visual() {
    const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"
    //state stuff
    const [data, loading] = useFetch(
        dataByYearURL
    );
    const [filter, setFilter] = useState("danceability")
    const [startYear, setStartYear] = useState(1921)
    const [endYear, setEndYear] = useState(2020)
    const [anchorEl, setAnchorEl] = useState(null);
    const [minOfCat, setMinOfCat] = useState(0.41445);
    const [maxOfCat, setMaxOfCat] = useState(0.69291);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFilterChange = (f) => { 
        console.log("change filter: " + f);
        setFilter(f);
        setAnchorEl(null);
        var tempArr = [];
        for (var t = 0; t < data.length; t++) {
            tempArr.push(data[t][f]);
        }
        setMinOfCat(Math.min.apply(Math, tempArr));
        setMaxOfCat(Math.max.apply(Math, tempArr));
    };
    const handleSliderChange = (e, v) => {
        console.log("set years to: " + v);
        setStartYear(v[0]);
        setEndYear(v[1]);
    };
    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 10;
    const xScale = scaleLinear()
        .domain([startYear, endYear])
        .range([105 + (startYear - 1921) * 5.3, 633 - (2020 - endYear) * 5.3]);
    const yScale = scaleLinear()
        .domain([maxOfCat, minOfCat])
        .range([50,500]);
    const _bins = bin().thresholds(10); //call bin i guess?
    const tmaxBins = _bins(
    // bin takes an array: aka map of the csv.
    data.map((d) => {
      return +d.year;
    }));
    return (
        <div className="histogram">
            <h1 className="centered">React and D3 Interactive Visualization</h1>
            <div className="filters">
                <div className="centered">
                    <h2>Change Filters</h2>
                    <Button style={{width:"300px"}} variant="contained" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                        {filter}
                    </Button>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={e => setAnchorEl(null)}
                        TransitionComponent={Fade}
                        variant="contained"
                        style={{width:"300px"}}
                    >
                        <MenuItem value="danceability" onClick={() => handleFilterChange("danceability")}>Danceability</MenuItem>
                        <MenuItem value="acousticness" onClick={() => handleFilterChange("acousticness")}>Acousticness</MenuItem>
                        <MenuItem value="liveness" onClick={() => handleFilterChange("liveness")}>Liveness</MenuItem>
                        <MenuItem value="popularity" onClick={() => handleFilterChange("popularity")}>Popularity</MenuItem>
                        <MenuItem value="tempo" onClick={() => handleFilterChange("tempo")}>Tempo</MenuItem>
                        <MenuItem value="valence" onClick={() => handleFilterChange("valence")}>Valence</MenuItem>
                        <MenuItem value="speechiness" onClick={() => handleFilterChange("speechiness")}>Speechiness</MenuItem>
                        <MenuItem value="instrumentalness" onClick={() => handleFilterChange("instrumentalness")}>Instrumentalness</MenuItem>
                        <MenuItem value="energy" onClick={() => handleFilterChange("energy")}>Energy</MenuItem>
                        <MenuItem value="duration_ms" onClick={() => handleFilterChange("duration_ms")}>Duration(ms)</MenuItem>
                    </Menu>
                </div>
                <div className="slider">
                    <h2 className="centered">Select Years</h2>
                    <AirbnbSlider
                        valueLabelDisplay="auto"
                        marks
                        min={1921}
                        max={2020}
                        style={{color: '#1DB954', height: "50px", width: 500, marginTop: "20px"}}
                        defaultValue={[1921, 2020]}
                        onChange={handleSliderChange}
                    />
                </div>
            </div>
            <svg width={630} height={500} style={{ border: "1px solid #1DB954" }}>
                {data.filter(r => { return r.year >= startYear && r.year <= endYear}).map((year, i) => {
                    var wholeList = []; 
                    for (var k = 0; k < data.length; k++) {
                        wholeList.push(data[k][filter]);
                    };
                    var minOfArr = Math.min.apply(Math, wholeList);
                    var maxofArr = Math.max.apply(Math, wholeList);
                    var range = maxofArr - minOfArr;
                    return (
                        <svg>

                            <rect
                                y={size - margin - ((year[filter] - minOfArr) * 450 / range)}
                                width="2.9"
                                height={(year[filter] - minOfArr) * 450 / range}
                                x={46 + (year['year'] - 1921) * 5.3}
                                fill="#1DB954"
                            />
                        </svg>
                    );
                    })}
                <g transform={`translate(-60, ${size - margin})`} className="axisBottom">
                    {/* define our axis here*/} 
                    <Axis
                        orient={Orient.bottom}
                        scale={xScale}
                        
                    />
                    </g>
                <g transform={`translate(${40 + 5.3 * (startYear - 1921)}, ${(size - margin) - size})`} className="axisBottom">
                    {/* define our axis here*/} 
                    <Axis
                        orient={Orient.left}
                        scale={yScale}
                        
                    />
                    </g>
                <text
                    x={size + 100 + margin - 5.3 * (2020 - endYear)}
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor}
                    style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
                >
                    Year
              </text>
                <text
                    x={100}
                    textAnchor="begin"
                    y={30}
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}
                >
              </text>
            </svg>
        </div>
    );
}
export default D3Visual;