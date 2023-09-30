import {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { OPPOSITION } from './utils';
import { BASE_URL } from './utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface Result {
    safe: number;
    likely: number;
    leaning: number;
    lastUpdate: string;
}

export interface FullResults {
    [key: string]: Result;
}

const defaultTeamResults: FullResults = {
    'Opozycja': {safe: 0, likely: 0, leaning: 0, lastUpdate: ''},
    'Reszta': {safe: 0, likely: 0, leaning: 0, lastUpdate: ''},
}

function sumResult(result: Result): number {
    return result.safe + result.likely + result.leaning
}

export function Chart(props: {type: string}) {
    const [teamResults, setTeamResults] = useState<FullResults>(defaultTeamResults);

    useEffect(() => {
        fetch(`${BASE_URL}/results/${props.type}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Calculate team results
            const teamResults: FullResults = {
                'Opozycja': {safe: 0, likely: 0, leaning: 0, lastUpdate: ''},
                'Reszta': { safe: 0, likely: 0, leaning: 0, lastUpdate: ''},
            }

            for (const key in data) {
                if (OPPOSITION.includes(key)) {
                    teamResults['Opozycja'].safe += data[key].safe
                    teamResults['Opozycja'].likely += data[key].likely
                    teamResults['Opozycja'].leaning += data[key].leaning
                    teamResults['Opozycja'].lastUpdate = data[key].lastUpdate
                } else {
                    teamResults['Reszta'].safe += data[key].safe
                    teamResults['Reszta'].likely += data[key].likely
                    teamResults['Reszta'].leaning += data[key].leaning
                    teamResults['Reszta'].lastUpdate = data[key].lastUpdate
                }
            }

            setTeamResults(teamResults)
            console.log(teamResults)
        })
    }, []);

    const seats = props.type === "sejm" ? 460 : 100;
    const elections_to = props.type === "sejm" ? "Sejmu" : "Senatu";

    const options = {
        plugins: {
          title: {
            display: true,
            text: `Wyniki wyborów do ${elections_to} 2023 w Polsce - ostatnia aktualizacja: ${teamResults['Opozycja'].lastUpdate}`,
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: 'y' as "y", // This is bad but what can you do
          scales: {
          x: {
              stacked: true,
              max: seats,
              ticks: {
                  stepSize: props.type === "sejm" ? 20 : 5,
                  font: {
                      size: 15,
                  },
              },
          },
          xAxis2: {
              max: seats,
              position: 'top' as "top",
              grid: {
                  lineWidth: 3,
                  color: 'black',
                  z: 1
              },
              ticks: {
                  stepSize: seats / 2,
                  font: {
                      size: 25,
                  },
              },
          },
          y: {
              stacked: true
          }
        },
      };

    const oppositionName = props.type === "sejm" ? "KO+TD+NL" : "Pakt Senacki"
    
    const data = {
        labels: [''],
        datasets: [
          {
            label: `${oppositionName} - Safe`,
            data: [teamResults['Opozycja'].safe],
            backgroundColor: '#ff8d03',
          },
          {
            label: `${oppositionName} - Likely`,
            data: [teamResults['Opozycja'].likely],
            backgroundColor: '#ffb303',
          },
          {
            label: `${oppositionName} - Leaning`,
            data: [teamResults['Opozycja'].leaning],
            backgroundColor: '#fcda79',
          },
          {
            label: 'Toss-up',
            data: [seats - sumResult(teamResults['Opozycja']) - sumResult(teamResults['Reszta'])],
            backgroundColor: '#d6d6d6',
          },
          {
            label: 'Reszta - Leaning',
            data: [teamResults['Reszta'].leaning],
            backgroundColor: '#6f66ed',
          },
          {
            label: 'Reszta - Likely',
            data: [teamResults['Reszta'].likely],
            backgroundColor: '#231a9c',
          },
          {
            label: 'Reszta - Safe',
            data: [teamResults['Reszta'].safe],
            backgroundColor: '#06014a',
          }
        ],
    };

    return (<div id="bar-graph" style={{ maxHeight: 250, minHeight: 200}}>
              <Bar options={options} data={data}/>
            </div>);
}
