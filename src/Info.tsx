import createTable from "./Table";
import createVisualization from "./Visualization";
import { createDefaultVisualization } from "./Visualization";
import { SEATS } from "./utils";
import { useState } from "react";
import { createProgressBar } from "./ProgressBar";
import { BASE_URL } from "./utils";

function goBack(type: string) {
    if (type === 'sejm') {
        createDefaultSejmInfo()
    } else {
        createDefaultSenatInfo()
    }
}

function clearInfo(id: number, type: string) {
    const info = document.getElementById('info')
    const elections_to = type === 'sejm' ? 'Sejmu' : 'Senatu'
    if (info) {
        if (id === -1) {
            info.innerHTML = 
            `
            <div id="info-header">
                <div id="info-title">
                    <h3>Wyniki wyborów do ${elections_to} 2023 w Polsce</h3>
                </div>
            </div>
            <div id="progressBar"></div>
            <div id="visualization"></div>
            <div id="table"></div>
            `
        } else {
            info.innerHTML = 
            `
            <div id="info-header">
                <button class="backButton">⬅</button>
                <div id="info-title">
                    <h3>Wyniki w okręgu nr ${id}</h3>
                </div>
            </div>
            <div id="progressBar"></div>
            <div id="visualization"></div>
            <div id="table"></div>
            `
        }

        const backButton = document.querySelector('.backButton')
        if (backButton) {
            backButton.addEventListener('click', () => goBack(type))
        }

        return
    }
}

export function generateSejmInfo(event: any) {
    const id = event.target.parentElement.dataset.id
    fetch(`${BASE_URL}/results/sejm/${id}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        clearInfo(id, 'sejm')
        createTable(data, 'sejm')
        createProgressBar(data)
        createVisualization(data, SEATS[id - 1])
    })
}

export function createDefaultSejmInfo() {
    fetch(`${BASE_URL}/results/sejm`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        clearInfo(-1, 'sejm')
        createTable(data, 'sejm')
        createDefaultVisualization(data, 'sejm')
    })
}

export function generateSenatInfo(event: any) {
    const id = event.target.parentElement.dataset.id
    fetch(`${BASE_URL}/results/senat/${id}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        clearInfo(id, 'senat')
        createProgressBar(data)
        createTable(data, 'senat')
    })
}

export function createDefaultSenatInfo() {
    fetch(`${BASE_URL}/results/senat`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        clearInfo(-1, 'senat')
        createTable(data, 'senat')
        createDefaultVisualization(data, 'senat')
    })
}