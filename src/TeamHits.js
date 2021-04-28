import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamHitsVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchise-hits-data--info474-QueryResult.csv'
    const [data, loading] = useFetch(
        githubDataURL
    );
    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Total Hits Per MLB Franchise",
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
              "text": {"field": "Hits", "type": "quantitative", "axis": {"labelAngle": 90}}
            }
        }],
        "encoding": {
            "x": {"field": "franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "Hits", "type": "quantitative"}
        }
    }
    vegaEmbed('#team-hits', vegaVariables);

    return (
        <div className="centered">
            <div id="team-hits">
                <p>{loading && "Loading the data!!!" }</p>
                <svg></svg>
            </div>
            <p className="vis-description">
                This visualization was fun to look at knowing that it was a very historic season for a handful of mariner players in regards to hits.
                Seeing that they let the league in hits made a lot of sense in comparison to the other charts that we were looking at. Hits result in RBI's, Homeruns, Wins, and the general score!
            </p>
            <p className="vis-description">
                I was surprised to see how yet again the Arizona Diamondbacks were lumped in the average group of total hits for the season even though they won the whole thing.
            </p>
        </div>
    )
}
export default TeamHitsVisual;