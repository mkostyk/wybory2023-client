export const BASE_URL = "https://wybory-2023-prod-92863b81ba12.herokuapp.com/"

export function getColorFromResult(results: any, id: number, type: string) {
    const result = results.results[id - 1]
    if (result === undefined) {
        return '#898989'
    }

    const parties = Object.keys(result) // TODO: this is bad, I should not use dicts everywhere
    const winner = parties[0]
    let colorType = ''

    if (type === 'senat') {
        if (result[winner].safe === 1) {
            colorType = 'safe'
        } else if (result[winner].likely === 1) {
            colorType = 'likely'
        } else if (result[winner].leaning === 1){
            colorType = 'leaning'
        } else {
            colorType = 'tossup'
        }
    } else {
        const second = parties[1]
        const winner_percentage = result[winner]['votes'] / result[winner]['totalVotes'] * 100
        const second_percentage = result[second]['votes'] / result[second]['totalVotes'] * 100

        const diff = winner_percentage - second_percentage
        
        if (diff > 20) {
            colorType = 'safe'
        } else if (diff > 10) {
            colorType = 'likely'
        } else {
            colorType = 'leaning'
        }
    }

    if (colorType === 'tossup') {
        return COLORS['tossup']['safe']
    }

    if (COLORS[winner] === undefined) {
        return COLORS["Inni"][colorType];
    }

    return COLORS[winner][colorType];
}

interface Color {
    [name: string]: string
}

export const COLORS: {[name: string]: Color} = {
    "Prawo i Sprawiedliwość": {'safe': '#06014a', 'likely': '#231a9c', 'leaning': '#6f66ed', 'tossup': '#d6d6d6'},
    "Koalicja Obywatelska": {'safe': '#ff8d03', 'likely': '#ffb303', 'leaning': '#fcda79', 'tossup': '#d6d6d6'},
    "Nowa Lewica": {'safe': '#ff0000', 'likely': '#ff5340', 'leaning': '#fca297', 'tossup': '#d6d6d6'},
    "Trzecia Droga": {'safe': '#ffff00', 'likely': '#ffff40', 'leaning': '#ffff80', 'tossup': '#d6d6d6'},
    "Konfederacja": {'safe': '#452814', 'likely': '#754421', 'leaning': '#b86e39', 'tossup': '#d6d6d6'},
    "Bezpartyjni Samorządowcy": {'safe': '#02fa02', 'likely': '#56fc56', 'leaning': '#a5faa5', 'tossup': '#d6d6d6'},
    "Mniejszość Niemiecka": {'safe': '#d000fa', 'likely': '#e669ff', 'leaning': '#efacfc', 'tossup': '#d6d6d6'},
    "Polska Jest Jedna": {'safe': '#03ffcd', 'likely': '#74fce1', 'leaning': '#b3fcee', 'tossup': '#d6d6d6'},
    "Inni": {'safe': '#000000', 'likely': '#262626', 'leaning': '#474747', 'tossup': '#d6d6d6'},
    "tossup": {'safe': '#d6d6d6', 'likely': '#d6d6d6', 'leaning': '#d6d6d6', 'tossup': '#d6d6d6'},
}

export const SEATS = [12, 8, 14, 12, 13, 15, 12, 12, 10, 9, 12, 8, 14, 10, 9, 10, 9, 12, 20, 12, 12, 11, 15, 14, 12, 14, 9, 7, 9, 9, 12, 9, 16, 8, 10, 12, 9, 9, 10, 8, 12]

export const OPPOSITION = ['Koalicja Obywatelska', 'Trzecia Droga', 'Nowa Lewica']

export const SHORT_NAME: {[name: string]: string}  = {
    "Prawo i Sprawiedliwość": "PiS",
    "Koalicja Obywatelska": "KO",
    "Nowa Lewica": "NL",
    "Trzecia Droga": "TD",
    "Konfederacja": "KONF",
    "Bezpartyjni Samorządowcy": "BS",
    "Mniejszość Niemiecka": "MN",
    "Polska Jest Jedna": "PJJ",
    "Niezależni": "NIEZ",
}

interface Next {
    value: string;
    who: string;
}

export interface Data {
    votes: number;
    totalVotes: number;
    current: number;
    next: Next;
    safe: number;
    likely: number;
    leaning: number;
    tossup: number;
    counted: number;
    date: string;
}

export interface FullData {
    [name: string]: Data
}

export const PaktSenacki: string[] = [
    "Koalicja Obywatelska",
    "Nowa Lewica",
    "Trzecia Droga",
    "KWW JÓZEFA ZAJĄCA",
    "KWW WADIM TYSZKIEWICZ - PAKT SENACKI",
    "KWW KRZYSZTOF KWIATKOWSKI - PAKT SENACKI",
    "KWW ANDRZEJ DZIUBA - PAKT SENACKI"
]