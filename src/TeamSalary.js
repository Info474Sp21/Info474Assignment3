import React, { Component } from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamSalaryVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/FranchiseSalary.csv'
    const [data, loading] = useFetch(
        githubDataURL
    );

    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Total Salarys Per MLB Franchise",
        "data": {"values": data},
        "mark": {"type": "bar", "cornerRadiusEnd": 1},
        "encoding": {
            "x": {"field": "franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "TeamSalary", "type": "quantitative"}
        }
    }
    vegaEmbed('#team-salary', vegaVariables);

    return (
        <div>
            <div id="team-salary">
                <p>{loading && "Loading the data!!!" }</p>
                <svg width="600" height="500"></svg>
            </div>
            <p className="vis-description">Description for the team salarys of 2001</p>
        </div>
    )
}
export default TeamSalaryVisual;