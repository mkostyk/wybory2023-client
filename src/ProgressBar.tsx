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
    import { FullData, isObjectEmpty } from './utils';
    import Chart from 'chart.js/auto'

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    );

    export function createProgressBar(resultsData: FullData) {
        const barDiv = document.getElementById('progressBar')
        console.log(resultsData)
        if (!barDiv || resultsData === undefined || isObjectEmpty(resultsData)) {
            return
        }

        const canvas = document.createElement('canvas')
        barDiv.style.height = '50px';
        barDiv.appendChild(canvas)

        const options = {
            plugins: {
                title: {
                    display: false,
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context: any) {
                            let label = context.dataset.label || '';
                            return label;
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: 'y' as "y", // This is bad but what can you do
            scales: {
                x: {
                    stacked: true,
                    max: 100,
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false,
                    }
                },
                y: {
                    stacked: true
                }
            },
        };

        const anyKey = Object.keys(resultsData)[0]
    
        const data = {
            labels: [''],
            datasets: [
            {
                label: `Policzone komisje: ${resultsData[anyKey]['counted']}%`,
                data: [resultsData[anyKey]['counted']],
                backgroundColor: '#9d032a',
            }
            ],
        };

        new Chart(
            canvas,
            {
            type: 'bar',
            data: data,
            options: options,
            }
        );
    }
