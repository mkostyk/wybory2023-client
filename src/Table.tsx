import { COLORS, FullData } from "./utils";

// Square is a small colored square inside a cell
function createCell(row:any, content:any, color?:any, square?:any){
    let text = document.createTextNode(content);
    let cell = row.insertCell(row.cells.length);
    cell.style.position = 'relative'
    if (color) {
        cell.style.backgroundColor = color
    }

    cell.appendChild(text);

    // Create a small colored square inside a cell with color 'square'
    if (square) {
        const div = document.createElement('div')
        div.style.width = '1rem'
        div.style.height = '1rem'
        div.style.backgroundColor = square
        div.style.display = 'inline-block'
        div.style.position = 'absolute'
        div.style.left = '50%'
        div.style.marginTop = '0.25rem'
        cell.appendChild(div)
    }
}

function createTable(data: FullData, type: string) {
    const tableDiv = document.getElementById('table')
    if (!tableDiv) {
        return
    }

    const table = document.createElement('table')

    const header = table.insertRow(0)
    createCell(header, '')
    createCell(header, 'Partia')
    createCell(header, 'Głosy')
    createCell(header, 'Procent')
    if (type === 'sejm') {
        createCell(header, 'Mandaty')
        createCell(header, 'Głosy do następnego mandatu')
    }

    // Create table rows
    for (const [key, value] of Object.entries(data)) {
        const row = table.insertRow(table.rows.length)
        if (!value.totalVotes) {
            continue;
        }

        const ourColor = COLORS[key] ? COLORS[key].safe : COLORS["Inni"].safe
        
        createCell(row, '', ourColor)
        createCell(row, key)
        createCell(row, value.votes)
        createCell(row, (value.votes * 100 / value.totalVotes).toFixed(2) + '%')
        if (type === 'sejm') {
            createCell(row, value.current)
            createCell(row, value.next.value, null, COLORS[value.next.who] ? COLORS[value.next.who].safe : null) // TODO
        }
    }

    tableDiv.appendChild(table)
}

export default createTable;