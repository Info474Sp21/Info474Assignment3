import React, { Component } from 'react'
import './style.css'
import { useFetch } from "../hooks/useFetch"

function D3Testing() {
    const dataByYearURL = "https://raw.githubusercontent.com/Info474Sp21/Info474Assignment3/main/data/data_by_year_o.csv"
    const githubDataURL = 'https://raw.githubusercontent.com/Cnovotn/Info474Assignment2/main/data/franchiseBasedData.csv';
    const [data, loading] = useFetch(
        dataByYearURL
    );
    console.log(data);
    return (
        <div>
            <h1 className="centered">Testing D3 Implementation</h1>
        </div>
    );

}
export default D3Testing;