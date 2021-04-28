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
        "signals": [
            {
              "name": "tooltip",
              "value": {},
              "on": [
                {"events": "rect:mouseover", "update": "datum"},
                {"events": "rect:mouseout",  "update": "{}"}
              ]
            }
          ],
        "mark": {"type": "bar", "cornerRadiusEnd": 1},
        "marks": [
            {
              "type": "rect",
              "from": {"data":"table"},
              "encode": {
                "enter": {
                  "x": {"scale": "xscale", "field": "Franchise"},
                  "width": {"scale": "xscale", "band": 1},
                  "y": {"scale": "yscale", "field": "Wins"},
                  "y2": {"scale": "yscale", "value": 0}
                },
                "update": {
                  "fill": {"value": "steelblue"}
                },
                "hover": {
                  "fill": {"value": "red"}
                }
              }
            },
            {
              "type": "text",
              "encode": {
                "enter": {
                  "align": {"value": "center"},
                  "baseline": {"value": "bottom"},
                  "fill": {"value": "#333"}
                },
                "update": {
                  "x": {"scale": "xscale", "signal": "tooltip.Franchise", "band": 0.5},
                  "y": {"scale": "yscale", "signal": "tooltip.Wins", "offset": -2},
                  "text": {"signal": "tooltip.Wins"},
                  "fillOpacity": [
                    {"test": "datum === tooltip", "value": 0},
                    {"value": 1}
                  ]
                }
              }
            }
        ],
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
            <p className="vis-description">
                The entire reason that I chose this season as the season to investigate out of all of them was because
                the Seattle Mariners were able to win the most regular season games in MLB history! It was also a great season for the 
                Oakland Athletics which is traditionally another team that struggles to get wins. 
            </p>
            <p className="vis-description">
                What I found most interesting was the fact that the Arizona Diamondbacks were the ones that won the world series
                even though they were barely above the middle of the pack for wins the entire season.
            </p>
        </div>
    )
}
export default TeamWinsVisual;