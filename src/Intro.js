import React, { Component } from 'react'
import './style.css'

export default class Intro extends Component {
    render() {
        return (
            <div>
                <h1>Clayton Novotney</h1>
                <h2>Info 474</h2>
                <h2>April 20th, 2021</h2>
                <h3>Exploratory Data Analysis, Assignment 2</h3>
                <br></br>
                <h2>Step 1: Data Selection</h2>
                <h4>Data Selected: MLB Statitistics from <a href="https://data.world/cnovotn/info474/workspace/intro">Data.World.com</a></h4>
                <p>In this full raw data set, there are roughly ~28,000 rows of data including information about individuals players and statistics on each of their seasons from 1985-2016.</p>
                <p>Since I am a big Seattle Mariners fan, and have been my entire life. I am curious about the statistics of the historic 2001 season where they were able to break the all time win record and set a new one at 116 wins in a single season.</p>
                <p>I am also very interested to look at the statistics of the Arizona Diamondbacks who won the world series that season, as well as the New York Yankees who beat us 4-1 in the series to end our playoff run.</p>
                <p>Unfortunately, the 2021 season underway right now is a promising season for the Los Angeles Dodgers and it is speculated that they might be able to take the throne away from the Mariners and beat the record of 116 wins.</p>
                <p>The columns I am most interested in are:</p>
                <p>Franchise, Season, Hits (H), Homeruns (HR), RBI, Salary, Wins, Strike-Outs (SO)</p>
                <br></br>
                <h4>Questions: </h4>
                <p>1) How much are teams paying for each of their hits and homeruns?</p>
                <p>2) What is the correlation between the number of wins each franchise has in comparison to the amount of money they spend on players?</p>
                <p>3) What is the cost effectiveness of certain teams per hit/homerun</p>
                <p>4) How well did the Mariners do in total compared to the Yankees and Cardinals who ended their post season and won the world series?</p>
                <br></br>
                <h2>Step 2: Exploratory Visual Analysis</h2>
                <p>
                    I got my data from a website called <a href="https://data.world/cnovotn/info474/workspace/intro">Data.World.com</a> and was able to execute certain SQL queries on the data set that was given. Since I was curious only about the 
                    2001 season and particular statistics, I was able to reduce the data down to a much simpler set of csv files to begin visualizing
                    and analyzing. 
                </p>
            </div>
        );
    };
}