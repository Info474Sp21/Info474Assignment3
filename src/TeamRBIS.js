import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamRBIsVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchise-rbis-data--info474-QueryResult.csv';
    const [data, loading] = useFetch(
        githubDataURL
    );
    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Total RBI's Per MLB Franchise",
        "width" : screen.width / 1.5,
        "height": "400",
        "data": {"values": data},
        "mark": {"type": "bar", "cornerRadiusEnd": 1},
        "layer": [{
            "mark": 'bar'
          },
          { "mark": {
              "type": "text",
              "align": "center",
              "baseline": "line-bottom",
          },
            "encoding": {
              "text": {"field": "RBIs", "type": "quantitative"}
            }
        }],
        "encoding": {
            "x": {"field": "Franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "RBIs", "type": "quantitative"}
        }
    }
    vegaVariables["data"]["values"]
    vegaEmbed('#team-rbis', vegaVariables);

    return (
        <div className="centered">
            <div id="team-rbis">
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                This visualization was surprising in the fact that the New York Yankees were very high in the RBI's compared to hits and Homeruns. Meaing that they were scoring runs efficiently via walks or past balls.
            </p>
        </div>
    )
}
export default TeamRBIsVisual;