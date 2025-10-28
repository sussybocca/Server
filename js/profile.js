// js/profile.js
import { getServers } from './supabase.js'

const profileServers = document.getElementById('profile-servers')
const container = document.getElementById('profile-container')
const user_id = sessionStorage.getItem('user_id') // Replace with your auth

async function loadProfileServers() {
    if (!user_id) return profileServers.innerHTML = 'Login required'

    const servers = await getServers()
    const userServers = servers.filter(s => s.user_id === user_id)

    profileServers.innerHTML = ''
    userServers.forEach(s => {
        const div = document.createElement('div')
        div.className = 'server-card'
        div.innerHTML = `<h3>Server ${s.id}</h3><button>Open</button>`
        div.querySelector('button').addEventListener('click', () => {
            container.innerHTML = `
                <style>${s.css}</style>
                ${s.html}
                <script>${s.js}<\/script>
            `
        })
        profileServers.appendChild(div)
    })
}

loadProfileServers()
