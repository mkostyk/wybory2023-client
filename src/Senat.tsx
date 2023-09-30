import React, { useEffect, useState } from 'react';
import { Chart } from './Chart';
import MenuSenat from './MenuSenat';
import SenatMap from './SenatMap';
import { createDefaultSenatInfo } from './Info';
import { BASE_URL } from './utils';

function Senat() {
    const [resultsData, setResultsData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`h${BASE_URL}/results/senat/detailed`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setResultsData(data)
            createDefaultSenatInfo()
      })
  }, []);

  return (
    <div id="container">
        <MenuSenat />
        <div id="body"  style={{marginLeft: '2.5%', marginRight: '2.5%'}}>
            <Chart type="senat" />
            <div id="data" style = {{display: 'inline-flex', width: '100%'}}>
                <div id="map" style={{display: "flex", paddingLeft: '2rem', paddingRight: '2rem', maxWidth: '50%', marginTop: '0.5rem'}}>
                    <SenatMap results={resultsData}/>
                </div>
                <div id="info" style={{maxWidth: '100%', marginLeft: "5rem"}}>
                    <div id="visualization"></div>
                    <div id="table"></div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Senat;