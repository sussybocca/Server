import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email } = req.body
  const code = Math.floor(100000 + Math.random() * 900000) // 6-digit code

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: `"Mini Servers" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`
    })
    // You could store this code in a Supabase table with TTL for verification
    res.status(200).json({ success: true, code })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
