import React, { Component } from 'react'
import './style.css'

export default class Conclusion extends Component {
    render() {
        return (
            <div style={{marginTop: 30}}>
                <h1>Conclusion/Write-Up</h1>
                <br></br>
                <p>
                    1) A rationale for your design decisions. How did you choose your particular visual encodings and interaction techniques? What alternatives did you consider and how did you arrive at your ultimate choices?
                </p>
                <p className="tabbed">
                    We chose the first and main intereactive element of being able to change the column displayed within the dataset, allowing users to view the most trends of music over the years for different variables.
                    This was importand to us because this visualization allows users to make insights of how music has changed over the years based on the certain parameters that were available within the data provided.
                    We also included the binning option, allowing users to pick a particular range of years for the column they are looking at. This allowed them to look at the specific years and see how the trends compared in those time periods.
                    This brought forward some difficulties in our coding because we were interested in having the SVG take up the entire space while using this filter technique, but instead, the X-Scale stayed the same and all of 
                    the SVG bars being loaded in were the same width for every bar, even when less bars were present.
                    Alternative interactive elements that we were interested in including were comparitive features, or the ability for users to include multiple column values within the barchart on any given data set. This proved to be difficult
                    since all of the ranges for the y-values were different for each column and could cause some serious issues that did not allow users to view a valid visualization.
                </p>
                <br></br>
                <p>
                    2) An overview of your development process. Describe how the work was split among the team members. Include a commentary on the development process, including answers to the following questions: Roughly how much time did you spend developing your application (in people-hours)? What aspects took the most time?
                </p>
                <p className="tabbed">
                    Our developement process was extremely educational and interesting for everyone involved. Since we were all in different time zones, getting the entire team to meet at the same time proved to be difficult, which resulted in us having
                    multiple different meetings with overlapping team members allowing us to all be on the same page as each other. With that being said, we were also able to break down tasks very well since we were all on different time tables. This adversity
                    allowed us to work concurrently with each other, having one person complete their contributions, push it to their branch, then let the next scheduled person merge their branch and continue where the last person left off. This went pretty smoothly for us,
                    starting with me setting up the github organization, needed librarys and general framework for the project, connecting to the data set, passing it off to Olivia who introduced our first rudimentary d3 visualization interacting with the data, who then passed it off
                    to Kelson who implemented the first interactive elements (sliders and data-column changes), who then passed it off to Zhan (Alex) who polished up the visualizations and added more functionality before passing it off to me to finalize the repo and push it to our published repo.
                    At this point we then all met together and finished some of the final touches that led us to the final product that we then submitted. In total, each team member spent between 6-10 hours working on this assignment to get us to the final product we submitted. After completing the final push, we 
                    discussed difficulties we encountered on this assignment and all came to the conclusion that working with React, D3 and the SVG's was difficult, and struggled the most with handling the D3 bar charts to be responsive and reactive to the data being displayed.
                </p>
            </div>
        );
    };
}