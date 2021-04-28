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
        "layer": [{
            "mark": 'bar'
          },
          { "mark": {
              "type": "text",
              "align": "center",
              "baseline": "line-bottom",
          },
            "encoding": {
              "text": {"field": "Wins", "type": "quantitative"}
            }
        }],
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