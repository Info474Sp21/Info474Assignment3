import React from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


function TeamSalaryVisual() {
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/FranchiseSalary.csv'
    const [data, loading] = useFetch(
        githubDataURL
    );
    var vegaVariables = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
        "title":"2001 Total Salarys Per MLB Franchise",
        "width" : screen.width / 1.5,
        "height": "400",
        "data": {"values": data},
        "mark": {"type": "bar", "cornerRadiusEnd": 1},
        "encoding": {
            "x": {"field": "Franchise", "type": "nominal", "axis": {"labelAngle": -90}},
            "y": {"field": "TeamSalary", "type": "quantitative"}
        }
    }
    vegaEmbed('#team-salary', vegaVariables);

    return (
        <div className="centered">
            <div id="team-salary">
                <p>{loading && "Loading the data!!!" }</p>
                <svg width="600" height="500"></svg>
            </div>
            <p className="vis-description">
                This visualiziton will be the same looking at any season since the amount of money each program has every year is proportionate to inflation and the seasons before.
                The Yankees, Dodgers and Boston Redsox always have the highest salaries and are able to buy the best players from other teams once their contracts are up and cant afford
                to pay their new found star contracts.
            </p>
        </div>
    )
}
export default TeamSalaryVisual;