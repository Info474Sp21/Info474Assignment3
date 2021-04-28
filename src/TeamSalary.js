import React, { Component } from 'react'
import './style.css'
import * as d3 from "d3";
import { useFetch } from "../hooks/useFetch"
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin } from "d3-array";
import { scale } from "vega";


function TeamSalaryVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/MLBStats.csv'
    const [data, loading] = useFetch(
        githubDataURL
    );
    const dataSmallSample = data.slice(0,300);
    const salaryMaxExtend = extent(dataSmallSample, (d) => {
        return +d.salary;
    })
    const size = 500;
    const margin = 20;
    const yScale =  scaleLinear()
    .domain(salaryMaxExtend)
    .range([size - margin, size - 350])
    _bins = bin()
    salaryBins = _bins(
        dataSmallSample.map((d) => {
            return +d.salary;
        })
    )
    console.log(salaryBins.map((bin, i) => {
        console.log(i, bin);
    }));

    return (
        <div>
            <div id="team-salary">
                <p>{loading && "Loading the data!!!" }</p>
            </div>
            <p className="vis-description">Description for the team salarys of 2001</p>
        </div>
    )
}
export default TeamSalaryVisual;