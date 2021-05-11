import React, {useState} from "react";
import TeamWinsVisual from "./TeamWins";
import Intro from "./Intro";
import Conclusion from './Conclusion';


const App = () => {
    return (
        <div id="main" className="container">
            <Intro/>
            <div className="flexed">
                <div className="data-center">
                    <TeamWinsVisual/>
                </div>
            </div>
            <Conclusion/>
        </div>
    );
};

export default App;