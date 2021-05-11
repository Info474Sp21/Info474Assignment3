import React, {useState} from "react";
import TeamWinsVisual from "./TeamWins";
import Intro from "./Intro";
import D3Testing from "./D3Testing";
import Conclusion from './Conclusion';


const App = () => {
    return (
        <div id="main" className="container">
            <Intro/>
            <div className="flexed data-center">
                <TeamWinsVisual/>
            </div>
            <Conclusion/>
            <D3Testing/>
        </div>
    );
};

export default App;