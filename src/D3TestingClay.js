import React, { useEffect, useRef, useState, Component } from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch";
import { extent, max, min, bin } from "d3-array";
import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";
import { scaleLinear } from "d3-scale";
import D3Testing from './D3Testing';

// export default class D3TestingClay extends Component{
    // const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"
    // const [data, loading] = useFetch(
    //     dataByYearURL
    // );   
// }
const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"
const [data, loading] = useFetch(
    dataByYearURL
); 

const D3TestingClay = () => {
  const d3Chart = useRef();
}
export default D3TestingClay

// function D3TestingClay() {
//     const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"
//     const [data, loading] = useFetch(
//         dataByYearURL
//     );
//     const size = 500;
//     const margin = 20;
//     const axisTextAlignmentFactor = 10;
//     const xScale = scaleLinear()
//       .domain(extent(data, (d) => d.year))
//       .range([size - 350, size]);
//     const _bins = bin().thresholds(10); //call bin i guess?
//     const tmaxBins = _bins(
//     // bin takes an array: aka map of the csv.
//     data.map((d) => {
//       return +d.year;
//     }));
//     var svg = d3.select("svg");;
//     return (
//         <div>
//             <h1 className="centered">Testing D3 Implementation</h1>
//             <svg width={1500} height={500} style={{ border: "1px solid black" }}>
//                 {data.map((year, i) => {
//                     return (
//                         <svg>
//                             <rect
//                                 y={size - margin - (year.acousticness * 200)}
//                                 width="2.8"
//                                 height={year.acousticness * 200}
//                                 x={100 + i * 3.4}
//                                 fill="black"
//                             />
//                         </svg>
//                     );
//                     })}
//                 <g transform={`translate(-60, ${size - margin})`} className="axisBottom">
//                     {/* define our axis here*/} 
//                     <Axis
//                         orient={Orient.bottom}
//                         scale={xScale}
//                     />
//                     </g>
//                 <text
//                     x={margin + 65}
//                     textAnchor="end"
//                     y={size - margin + axisTextAlignmentFactor}
//                     style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
//                 >
//                     Year
//               </text>
//                 <text
//                     x={100}
//                     textAnchor="begin"
//                     y={30}
//                     style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}
//                 >
//                     I need to look at how to bin this.
//               </text>
//             </svg>
//         </div>
//     );
//     //slider
//     //binning by decade
//     //changing y axis based on the visualization


// }
// export default D3TestingClay;