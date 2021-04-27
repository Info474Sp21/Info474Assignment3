import React from "react";

const App = () => {
    return (
        <div>
            <h1>Clayton Novotney</h1>
            <h2>Info 474</h2>
            <h2>April 20th, 2021</h2>
            <h3>Exploratory Data Analysis, Assignment 2</h3>
            <br></br>
            <h2>Step 1: Data Selection</h2>
            <h4>Data Selected: MLB Statitistics</h4>
            <p>In this data set, there are roughly ~28,000 rows of data including information about individuals players and statistics on each of their seasons from 1985-2016.</p>
            <p>Since I am a big Seattle Mariners fan, and have been my entire life. I am curious about the statistics of the historic 2001 season where they were able to break the all time win record and set a new one at 116 wins in a single season.</p>
            <p>I am also very interested to look at the statistics of the Arizona Diamondbacks who won the world series that season, as well as the New York Yankees who beat us 4-1 in the series to end our playoff run.</p>
            <p>Unfortunately, the 2021 season underway right now is a promising season for the Los Angeles Dodgers and it is speculated that they might be able to take the throne away from the Mariners and beat the record of 116 wins.</p>
            <p>The columns I am most interested in are:</p>
            <table>
                <thead>
                    <th>Bats</th>
                    <th>Franchise</th>
                    <th>Throws</th>
                    <th>Season</th>
                    <th>Hits (H)</th>
                    <th>Homeruns (HR)</th>
                    <th>RBI</th>
                    <th>Salary</th>
                </thead>
                <tbody>
                    <tr>
                        <td>R/L/B</td>
                        <td>Franchise Name</td>
                        <td>R/L/B</td>
                        <td>Year</td>
                        <td>#</td>
                        <td>#</td>
                        <td>#</td>
                        <td>#</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <h4>Questions: </h4>
            <p>1) How has the avg salary per player on each team progressed as the years have gone on?</p>
            <p>2) What is the correlation between the number of wins each franchise has in comparison to the amount of money they spend on players?</p>
            <p>3) What is the cost effectiveness of certain teams per hit/homerun</p>
            <h2>Step 2: Exploratory Visual Analysis</h2>
            <p>While using tableau, I was able to put together the following visualizations that allowed me to draw more insightful conclusions about the data that I have been working with</p>
        </div>
    );
};

export default App;