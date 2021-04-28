import React, {useState} from "react";
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin } from "d3-array";
import { scale } from "vega";
import vegaEmbed from 'vega-embed';
import TeamSalary from "./TeamSalary";
import Intro from "./Intro";


const App = () => {
    return (
        <div>
            <Intro/>
            <TeamSalary/>
        </div>
    );
};

export default App;