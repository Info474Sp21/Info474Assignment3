import React, { Component, useState } from 'react'
import './style.css'
import {Button, Menu} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useFetch } from "../hooks/useFetch"
import { extent, max, min, bin } from "d3-array";
import { Axis, Orient } from "d3-axis-for-react"
import { scaleLinear } from "d3-scale";

function D3Testing() {
    const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"; 
    //state stuff
    const [data, loading] = useFetch(
        dataByYearURL
    );
    const [filter, setFilter] = useState("danceability")
    const [binYear, setYear] = useState(1930)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFilterChange = (f) => { 
        console.log("change filter: " + f)
        setFilter(f)
        setAnchorEl(null);
    }
    const handleSliderChange = (e, v) => {
        console.log("change binYear: " + v)
        setYear(v)
    }
    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 10;
    const xScale = scaleLinear()
        .domain(extent(data, (d) => d.year))
        .range([size - 350, size]);
    const _bins = bin().thresholds(10); //call bin i guess?
    const tmaxBins = _bins(
        // bin takes an array: aka map of the csv.
        data.map((d) => {
        return +d.year;
        }));
    return (
        <div className="histogram">
            <h1 className="centered">Spotify D3 Interactive Visualization</h1>
            <div className="filters">
                <div>
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
                    <h2>Select Year Bins</h2>
                    <Slider
                        defaultValue={1930}
                        aria-labelledby="discrete-slider-small-steps"
                        step={10}
                        marks
                        min={1920}
                        max={2020}
                        valueLabelDisplay="auto"
                        style={{color: '#1DB954', height: "50px", width: 500, marginTop: "20px"}}
                        onChange={handleSliderChange}
                    />
                </div>
            </div>
            <svg width={500} height={500} style={{ border: "1px solid #1DB954" }}>
                {data.map((year, i) => {
                    return (
                        <svg>

                            <rect
                                y={size - margin - (year[filter] * 200)}
                                width="2.8"
                                height={year[filter] * 200}
                                x={100 + i * 3.4}
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
                <text
                    x={margin + 65}
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
                    I need to look at how to bin this.
              </text>
            </svg>
        </div>
    );
}
export default D3Testing;