import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamWinsVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchiseBasedData.csv'
    const [data, loading] = useFetch(
        githubDataURL
    );

    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises wins for 2001.",
        "title":"2001 Wins For Each Franchise",
        "width" : screen.width / 1.5,
        "height": "400",
        "data": {"values": data},
        "mark": {"type": "bar", "cornerRadiusEnd": 1},
        "encoding": {
            "x": {"field": "Franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "Wins", "type": "quantitative"}
        }
    }
    vegaEmbed('#team-wins', vegaVariables);
    return (
        <div className='centered'>
            <div id="team-wins">
                <p>{loading && "Loading the data!!!" }</p>
                <svg width="600" height="500"></svg>
            </div>
            <p className="vis-description">Description for the team wins of 2001</p>
        </div>
    )
}
export default TeamWinsVisual;