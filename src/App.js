import React, {useState} from "react";
import TeamWinsVisual from "./TeamWins";
import TeamSalaryVisual from "./TeamSalary";
import TeamHitsVisual from "./TeamHits";
import TeamPricePerHitVisual from './TeamPricePerHit';
import TeamRBIsVisual from "./TeamRBIS";
import TeamHomerunsVisual from "./TeamHomeRuns";
import TeamPricePerHomerunVisual from './TeamPricePerHomerun';
import TeamStrikeoutVisual from './TeamStrikeouts';
import Intro from "./Intro";
import Conclusion from './Conclusion';
import TestingGraphic from "./TestingGraphic";


const App = () => {
    
    const comps = [
        <TeamWinsVisual/>,
        <TeamSalaryVisual/>,
        <TeamHitsVisual/>,
        <TeamPricePerHitVisual/>,
        <TeamRBIsVisual/>,
        <TeamHomerunsVisual/>,
        <TeamPricePerHomerunVisual/>,
        <TeamStrikeoutVisual/>
    ];
    var [index, setIndex] = useState(0);

    function nextVis() {
        if(index == comps.length) {
            setIndex(0);
        } else {
            setIndex(index++);
        }
    }
    function lastVis(){
        if(index == -1) {
            setIndex(comps.length - 1);
        } else {
            setIndex(index--);
        }
    }
    return (
        <div id="main" className="container">
            <Intro/>
            <div className="flexed">
                <div className="left-side">
                    <button onClick={lastVis}>Back</button>
                </div>
                <div className="data-center">
                    {comps[index]}
                </div>
                <div className="right-side">
                    <button onClick={nextVis}>Next</button>
                </div>
            </div>
            <Conclusion/>
            <h1 className="centered" style={{margin:30}}>Testing with different tools and interactive elements</h1>
            <TestingGraphic/>
        </div>
    );
};

export default App;