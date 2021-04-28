import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamPricePerHitVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchise-salaryhits-info474-QueryResult.csv';
    const [data, loading] = useFetch(
        githubDataURL
    );
    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Salary / Hits Per Franchise",
        "width" : screen.width / 1.5,
        "height": "400",
        "data": {"values": data},
        "mark": {
            "type": "bar", 
            "cornerRadiusEnd": 1,
        },
        "encoding": {
            "x": {"field": "Franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "TeamPricePerHit", "type": "quantitative"}
        },
        "signals": [
            {
              "name": "tooltip",
              "value": {},
              "on": [
                {"events": "rect:mouseover", "update": "datum"},
                {"events": "rect:mouseout",  "update": "{}"}
              ]
            }
          ]
    }
    vegaEmbed('#team-price-hit', vegaVariables);

    return (
        <div className="centered">
            <div id="team-price-hit">
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                Knowing that the LA Dodgers and New York Yankees are the highest Salaried teams, this makes a lot of sense that they are paying the most per hit.
            </p>
        </div>
    )
}
export default TeamPricePerHitVisual;