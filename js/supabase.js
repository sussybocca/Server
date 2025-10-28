// js/supabase.js
// Frontend calls to Vercel serverless functions (secrets only live on server)

export async function getServers() {
    try {
        const res = await fetch('/api/supabase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getServers' })
        })
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return await res.json()
    } catch (err) {
        console.error('Error fetching servers:', err)
        return []
    }
}

export async function publishServer(html, css, jsCode, user_id) {
    try {
        const res = await fetch('/api/supabase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'publishServer', payload: { html, css, js: jsCode, user_id } })
        })
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return await res.json()
    } catch (err) {
        console.error('Error publishing server:', err)
        return { error: err.message }
    }
}

export async function sendVerification(email, code) {
    try {
        const res = await fetch('/api/sendVerification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        })
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return await res.json()
    } catch (err) {
        console.error('Error sending verification:', err)
        return { error: err.message }
    }
}
