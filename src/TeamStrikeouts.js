import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamStrikeoutVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchisestrikeouts-info474-QueryResult.csv';
    const [data, loading] = useFetch(
        githubDataURL
    );
    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Total Strikeouts Per MLB Franchise",
        "width" : screen.width / 1.5,
        "height": "400",
        "data": {"values": data},
        "mark": {"type": "bar", "cornerRadiusEnd": 1},
        "encoding": {
            "x": {"field": "Franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "NumStrikeouts", "type": "quantitative"}
        }
    }
    vegaEmbed('#team-strikeouts', vegaVariables);

    return (
        <div className="centered">
            <div id="team-strikeouts">
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                Teams that get more hits, and more at bats, will also have more strikeouts due to the fact that they have more opportunites
                to do something at the plate.
            </p>
        </div>
    )
}
export default TeamStrikeoutVisual;