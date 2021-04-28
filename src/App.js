import React, {useState} from "react";
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin } from "d3-array";
import { scale } from "vega";
import vegaEmbed from 'vega-embed';
import TeamWinsVisual from "./TeamWins";
import TeamSalaryVisual from "./TeamSalary";
import TeamHitsVisual from "./TeamHits";
import TeamRBIsVisual from "./TeamRBIS"
import TeamHomerunsVisual from "./TeamHomeRuns"
import TeamPricePerHomerunVisual from './TeamPricePerHomerun';
import Intro from "./Intro";
import CreateVisual from "./CreateVisual"


const App = () => {
    

    return (
        <div id="main" className="container">
            <Intro/>
            <TeamWinsVisual/>
            <TeamSalaryVisual/>
            <TeamHitsVisual/>
            <TeamRBIsVisual/>
            <TeamHomerunsVisual/>
            <TeamPricePerHomerunVisual/>
        </div>
    );
};

export default App;