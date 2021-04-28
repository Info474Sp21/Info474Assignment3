import React, {useState, Component} from "react";
import './style.css'
import { useFetch } from "../hooks/useFetch"
import vegaEmbed from 'vega-embed';


export default class CreateVisual extends Component {
    render() {
        const [index, setIndex] = useState(0);
        const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/';
        const order = ["Wins", "Salary", "Hits", "RBI's","Homeruns", "Strikeouts"];
        const dataPoints = {
            "Wins" : {
                "Endpoint" : "franchisewins2001.csv",
                "X-Field": "Franchise",
                "Y-Field": "Wins",
                "Title":"2001 Total Wins For Each Franchise",
                "Description": "Description for the wins of 2001 teams"
            },
            "Salary" : {
                "Endpoint" : "FranchiseSalary.csv",
                "X-Field": "Franchise",
                "Y-Field": "TeamSalary",
                "Title":"2001 Total Salary For Each Franchise",
                "Description": "Description for the salary of 2001 teams"
            },
            "Hits" : {
                "Endpoint" : "franchise-hits-data--info474-QueryResult.csv",
                "X-Field": "franchise",
                "Y-Field": "Hits",
                "Title":"2001 Total Hits For Each Franchise",
                "Description": "Description for the hits of 2001 teams"
            },
            "RBI's" : {
                "Endpoint" : "franchise-rbis-data--info474-QueryResult.csv",
                "X-Field": "Franchise",
                "Y-Field": "RBIs",
                "Title":"2001 Total RBI's For Each Franchise",
                "Description": "Description for the RBI's of 2001 teams"
            },
            "Homeruns" : {
                "Endpoint" : "franchise-homeruns-d-info474-QueryResult.csv",
                "X-Field": "Franchise",
                "Y-Field": "Homeruns",
                "Title":"2001 Total Homeruns For Each Franchise",
                "Description": "Description for the Homeruns of 2001 teams"
            },
            "Strikeouts" : {
                "Endpoint" : "franchisestrikeouts-info474-QueryResult.csv",
                "X-Field": "Franchise",
                "Y-Field": "NumStrikeouts",
                "Title":"2001 Total Strikeouts For Each Franchise",
                "Description": "Description for the Strikeouts of 2001 teams"
            }
        }
        function nextVisual() {
            console.log("next index" + index);
            if(index == order.length ) {
                setIndex(0);
            } else {
                setIndex(index+1)
            }
            var thisInfo = dataPoints[order[index]];
            populateData(thisInfo);
        }
        function lastVisual() {
            console.log("last index" + index);
            if(index == -1) {
                setIndex(order.length -1)
            } else {
                setIndex(index-1)
            }
            var thisInfo = dataPoints[order[index]];
            populateData(thisInfo);
        }
        var thisDataInfo = dataPoints["Wins"];
        var [data, loading] = useFetch(
            githubDataURL + dataPoints["Wins"]["Endpoint"]
        );
        function populateData(thisDataInfo) {
            console.log(thisDataInfo);
            var [data, loading] = useFetch(
                githubDataURL + thisDataInfo["Endpoint"]
            )
            var vegaVariables = {
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "description": "A simple bar chart looking at all of the MLB franchises salary for 2001.",
                "title":thisDataInfo["Title"],
                "width" : screen.width / 1.5,
                "height": "400",
                "data": {"values": data},
                "mark": {"type": "bar", "cornerRadiusEnd": 1},
                "encoding": {
                    "x": {"field": thisDataInfo["X-Field"], "type": "nominal", "axis": {"labelAngle": -90}},
                    "y": {"field": thisDataInfo["Y-Field"], "type": "quantitative"}
                }
            }
            vegaEmbed('#visualization', vegaVariables);
        }
        populateData(thisDataInfo);
        return (
            <div id="data-context" className="flexed">
                <div className="left-side">
                    <button onClick={lastVisual}>Last</button>
                </div>
                <div className="data-center">
                    <div className="centered">
                        <div id="visualization">
                            <p>{loading && "Loading the data!!!" }</p>
                            <svg width="600" height="500"></svg>
                        </div>
                        <p className="vis-description">Description for the team salarys of 2001</p>
                    </div>
                </div>
                <div className="right-side">
                    <button onClick={nextVisual}>Next</button>
                </div>
            </div>
        );
    };
}
