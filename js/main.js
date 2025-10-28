// js/main.js
import { getServers } from './supabase.js'

const serverList = document.getElementById('server-list')
const container = document.getElementById('main-container')

async function loadServers() {
    const servers = await getServers()
    serverList.innerHTML = ''

    servers.forEach(server => {
        const div = document.createElement('div')
        div.className = 'server-card'
        div.innerHTML = `<h3>Server ${server.id}</h3><button>Open</button>`
        div.querySelector('button').addEventListener('click', () => loadServer(server))
        serverList.appendChild(div)
    })
}

function loadServer(server) {
    container.innerHTML = `
        <style>${server.css}</style>
        ${server.html}
        <script>${server.js}<\/script>
    `
}

loadServers()
