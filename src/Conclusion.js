import React, { Component } from 'react'
import './style.css'

export default class Conclusion extends Component {
    render() {
        return (
            <div style={{marginTop: 30}}>
                <h1>Conclusion</h1>
                <br></br>
                <p>
                    In summary to my experience with this assignment. I found myself completing very redundant processing for loading
                    transforming and displaying the data within the data sets that I found. I tried multiple times to reduce redundancies within my code but began running into
                    issues with the DOM, Hooks, and other tedious problems that required me to basically brute force this assignment and create multiple redudanct components that 
                    I would then load into the Vega visualiser. 
                </p>
                <br></br>
                <p>
                    Using Tableau for the initial data loading and transformation was very obnoxious because working with the graphical user interface on their application
                    was SOOOOO much easier than physically coding in the visualisations that I was interested in displaying using VEGA. While I chose to use VEGA for this assignment,
                    I started out working with D3 as well and could see the appeal to that library program as well.
                </p>
                <br></br>
                <p>
                    I also figured out at the end of the assignment, that the data sets that I was using was also very redundant. I could have easily
                    created one main data set with all of the columns that I loaded into multiple different csv files.
                </p>
                <br></br>
                <p>
                    All in all, this was a very interesting assignment to work on and helped me get acquanted with the coding programs that are used for visualizing data
                    in the web interfaces we are using every day.
                </p>
            </div>
        );
    };
}