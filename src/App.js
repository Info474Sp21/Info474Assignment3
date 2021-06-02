import React from "react";
import Intro from "./Intro";
import D3Visual from "./D3Visual";
import ScatterPlot from "./ScatterPlot"
import Conclusion from './Conclusion';
import VisualSection from "./VisualSection"



const App = () => {
    return (
        <div id="main" className="container">
            <Intro/>
            <div>
                <br></br>
                {/* <D3Visual/>
                <ScatterPlot/> */}
                <VisualSection/>
            </div>
            <Conclusion/>
        </div>
    );
};

export default App;