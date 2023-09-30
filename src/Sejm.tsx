import React, { useEffect, useState } from 'react';
import { Chart } from './Chart';
import SejmMap from './SejmMap';
import { FullData } from './utils';
import { createDefaultSejmInfo } from './Info';
import MenuSejm from './MenuSejm';
import { BASE_URL } from './utils';

function Sejm() {
    const [resultsData, setResultsData] = useState<any[]>([]);

    useEffect(() => {
          fetch(`${BASE_URL}/results/sejm/detailed`)
          .then(response => {
              return response.json()
          })
          .then(data => {
              setResultsData(data)
              createDefaultSejmInfo()
        })
    }, []);

    return (
        <div id="container">
            <MenuSejm />
            <div id="body"  style={{marginLeft: '2.5%', marginRight: '2.5%'}}>
                <Chart type="sejm"/>
                <div id="data" style = {{display: 'inline-flex', width: '100%'}}>
                    <div id="map" style={{display: "flex", paddingLeft: '2rem', paddingRight: '2rem', maxWidth: '50%', marginTop: '0.5rem'}}>
                        <SejmMap results={resultsData}/>
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

export default Sejm;