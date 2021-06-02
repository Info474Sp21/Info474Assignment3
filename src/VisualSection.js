import D3Visual from "./D3Visual";
import ScatterPlot from "./ScatterPlot"
import Switch from "react-switch";
import React, { useState } from "react";

function VisualSection() {

  const [checked, setChecked] = useState(false)
  
  return (
    <div id="visual-section">
      <div className="switchdiv centered">
        <label className="switch-label">Scatterplot </label>
        <Switch color="primary" onChange={e => setChecked(!checked)} checked={checked} uncheckedIcon={false} checkedIcon={false}/>
        <label className="switch-label"> Bar Chart</label>
      </div>
      <br></br>
      {checked ? <D3Visual /> : <ScatterPlot />}
    </div>
  );
  
}

export default VisualSection;