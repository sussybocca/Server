import { publishServer, sendVerification } from './supabase.js'

// Initialize Monaco Editors
const htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
    value: '<h1>My Mini Server</h1>', language: 'html'
})
const cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
    value: 'body { background: white; color: black; }', language: 'css'
})
const jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
    value: 'console.log("Hello World")', language: 'javascript'
})

let verified = false
let verificationCode = null

// Send verification code
document.getElementById('verify-btn').addEventListener('click', async () => {
    const email = sessionStorage.getItem('user_email') // Assuming logged-in user email
    if (!email) return alert('You must be logged in!')

    const res = await sendVerification(email)
    if (res.error) return alert('Error sending code: ' + res.error)

    verificationCode = res.code
    alert('Verification code sent! Check your email.')
})

// Check verification and publish
document.getElementById('publish-btn').addEventListener('click', async () => {
    const entered = document.getElementById('verification-code').value
    if (entered !== String(verificationCode)) return alert('Invalid verification code!')

    verified = true

    const user_id = sessionStorage.getItem('user_id') // Authenticated user
    if (!user_id) return alert('Login required!')

    const result = await publishServer(
        htmlEditor.getValue(),
        cssEditor.getValue(),
        jsEditor.getValue(),
        user_id
    )

    if (result.error) return alert('Error publishing server: ' + result.error)
    alert('Server published successfully!')
})
