import React, { Component } from 'react'
import './style.css'

export default class Conclusion extends Component {
    render() {
        return (
            <div style={{marginTop: 30}}>
                <h1>Conclusion</h1>
                <br></br>
                <h5>Your deployed webpage should also include a write-up with the following components:</h5>
                <p className="tabbed">
                    1) A rationale for your design decisions. How did you choose your particular visual encodings and interaction techniques? What alternatives did you consider and how did you arrive at your ultimate choices?
                </p>
                <p className="tabbed">
                    2) An overview of your development process. Describe how the work was split among the team members. Include a commentary on the development process, including answers to the following questions: Roughly how much time did you spend developing your application (in people-hours)? What aspects took the most time?
                </p>
            </div>
        );
    };
}