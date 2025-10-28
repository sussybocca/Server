// js/server.js
import { publishServer } from './supabase.js'

// Initialize Monaco editors
const htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
    value: '<h1>My Mini Server</h1>',
    language: 'html'
})
const cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
    value: 'body { background: white; color: black; }',
    language: 'css'
})
const jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
    value: 'console.log("Hello World")',
    language: 'javascript'
})

document.getElementById('publish-btn').addEventListener('click', async () => {
    const user_id = sessionStorage.getItem('user_id') // Replace with your auth method
    if (!user_id) return alert('Login required!')

    const result = await publishServer(
        htmlEditor.getValue(),
        cssEditor.getValue(),
        jsEditor.getValue(),
        user_id
    )

    if (result.error) return alert('Error: ' + result.error)
    alert('Server published successfully!')
})
