import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function BigGraphic() {
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
      var allData =
      {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A scatterplot showing the salary and wins for each of the franchises in the MLB.",
        "data": {"values": data},
        "mark": "circle",
        "width" : screen.width / 1.5,
        "height": "400",
        "padding": 5,
        "layer": [{
            "mark": 'circle'
          },
          { "mark": {
                "type": "text",
                "align": "center",
                "baseline": "line-bottom",
                "tooltip": {"content": "data"},
          },
            "encoding": {
              "text": {"field": "Franchise", "type": "nominal"}
            }
        }],
        "encoding": {
          "x": {"field": "Salary", "type": "quantitative", "scale": {"domain": [25000000,130000000]}},
          "y": {"field": "Wins", "type": "quantitative", "scale": {"domain": [50,130]}}
        }
      }
    vegaEmbed('#big-graphic-2', allData);
    return (
        <div className="centered" style={{margin:30}}>
            <div id="big-graphic-2">
                <h1>Main Graphic With All Data</h1>
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                This Visualization was extremely helpful for simply looking at all of the data points that are associated with each team.
                Since I am most curious about how the salary of each team affects their performance throughout the season, I have included the salary as the x-axis
                label and included the hits/wins as the y-axis which can be seen as the biggest measure of success for a season.
            </p>
            <p>
                I am especially excited to see within this graphic that the Seattle Mariners and Oakland Athletics were at the top of the wins spectrum
                even though they were middle and below the average salary for the season.
            </p>
        </div>
    )
}
export default BigGraphic;