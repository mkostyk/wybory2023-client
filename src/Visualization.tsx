import { COLORS, SHORT_NAME, FullData } from "./utils";

// Creates a 100% pie chart with party's color
function createSquare(party: string, type: string, size: string, count: number = 1) {
    const div = document.createElement('div')
    if (size === 'standard') {
        div.style.width = '3.5rem'
        div.style.height = '3.5rem'
    } else {
        div.style.width = size
        div.style.height = size
    }

    div.style.display = 'flex'
    div.style.margin = '0.1rem'

    const color = COLORS[party] ? COLORS[party][type] : COLORS['Inni'][type]
    div.style.backgroundColor =  color

    if (party === 'tossup') {
        div.dataset.type = 'Toss-up'
    } else {
        div.dataset.type = `${SHORT_NAME[party]} - ${type.charAt(0).toUpperCase() + type.slice(1)}`
    }

    if (count !== 1) {
        div.dataset.type = div.dataset.type + `: ${count}`
    }

    return div;
}


function createManyPies(party: string, type: string, count: number, size: string) {
    const div = document.getElementById('visualization')
    if (!div) {
        return
    }

    for (let i = 0; i < count; i++) {
        div.appendChild(createSquare(party, type, size, size === 'standard' ? 1 : count))
    }
}


function createVisualization(data: FullData, seats: number, size = 'standard') {
    const div = document.getElementById('visualization')
    if (!div) {
        return
    }

    let count = 0
    for (const [key, value] of Object.entries(data)) {
        createManyPies(key, 'safe', value.safe, size)
        createManyPies(key, 'likely', value.likely, size)
        createManyPies(key, 'leaning', value.leaning, size)
        createManyPies(key, 'tossup', value.tossup, size) // Party tossups
        count += value.safe + value.likely + value.leaning + value.tossup
    }
}

export function createDefaultVisualization(data: FullData, type: string) {
    const seats = type === 'sejm' ? 460 : 100
    const size = type === 'sejm' ? '1.25rem' : '2.4rem'
    createVisualization(data, seats, size)
}

export default createVisualization;
