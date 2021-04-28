import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TestingGraphic() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchiseBasedData.csv';
    const [data, loading] = useFetch(
        githubDataURL
    );
    const dataValues = {
        "Wins" : "Wins",
        "Salary" : "Salary",
        "Strikeouts" : "NumStrikeouts",
        "Hits":"Hits",
        "Homeruns" : "Homeruns",
        "RBI's": "RBIs",
        "PricePerHit":"PricePerHit",
        "PricePerHomerun":"PricePerHomerun"
    }
    var example =
    {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "A basic bar chart example, with value labels shown upon mouse hover.",
        "title":"Wins Per Franchise 2001",
        "width" : screen.width / 1.5,
        "height": "400",
        "padding": 5,
        "data": [
          {
            "name": "table",
            "values": data
          }
        ],
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
        "scales": [
          {
            "name": "xscale",
            "type": "band",
            "domain": {"data": "table", "field": "Franchise"},
            "range": "width",
            "padding": 0.05,
            "round": true
          },
          {
            "name": "yscale",
            "domain": {"data": "table", "field": "Wins"},
            "nice": true,
            "range": "height"
          }
        ],
        "axes": [
          { "orient": "bottom", "title" : "Franchise", "scale": "xscale", "labelAngle": -75, "zindex" : 5,"labelColor" :"#FFCC00"},
          { "orient": "left", "title" : "Wins", "scale": "yscale"}
        ], 
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
                "fill": {"value": "#002D72"}
              },
              "hover": {
                "fill": {"value": "#D50032"}
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
                "y": {"scale": "yscale", "signal": "tooltip.Wins", "offset": 0},
                "text": {"signal": "tooltip.Wins"},
                "fillOpacity": [
                  {"test": "datum === tooltip", "value": 0},
                  {"value": 1}
                ]
              }
            }
          }
        ]
      }
    vegaEmbed('#big-graphic', example);
    return (
        <div className="centered">
            <div id="big-graphic">
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                Working with different types of graphical tools and interactive elements
            </p>
        </div>
    )
}
export default TestingGraphic;