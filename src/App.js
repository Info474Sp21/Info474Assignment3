import React from "react";
import Intro from "./Intro";
import D3Visual from "./D3Visual";
import Conclusion from './Conclusion';


const App = () => {
    return (
        <div id="main" className="container">
            <Intro/>
            <div>
                <br></br>
                <D3Visual/>
            </div>
            <Conclusion/>
        </div>
    );
};

export default App;