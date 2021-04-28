import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamPricePerHomerunVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchise-salary-per-info474-QueryResult.csv';
    const [data, loading] = useFetch(
        githubDataURL
    );
    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Salary / Homeruns Per Franchise",
        "width" : screen.width / 1.5,
        "height": "400",
        "data": {"values": data},
        "mark": {
            "type": "bar", 
            "cornerRadiusEnd": 1,
        },
        "layer": [{
            "mark": 'bar'
          },
          { "mark": {
              "type": "text",
              "align": "center",
              "baseline": "line-bottom",
          },
            "encoding": {
              "text": {"field": "TeamPricePerHomerun", "type": "quantitative", "axis": {"labelAngle": -90}}
            }
        }],
        "encoding": {
            "x": {"field": "Franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "TeamPricePerHomerun", "type": "quantitative"}
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
    vegaEmbed('#team-price-homerun', vegaVariables);

    return (
        <div className="centered">
            <div id="team-price-homerun">
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                Again, this makes a lot of sense knowing that the teams that pay the most for their players are in result still paying proportitely more for each of their hits and Homeruns
                that they are getting during the season. This just goes to show that the success within the MLB league is significantly biased towards programs that are capable
                of shelling out more money than other programs who don't have as much money to spend on players.
            </p>
        </div>
    )
}
export default TeamPricePerHomerunVisual;