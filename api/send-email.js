export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Global Compass AI <onboarding@resend.dev>',
        to: [email],
        subject: 'Your Strategic Consultation Request - Global Compass AI',
        html: `<div style='font-family: sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;'><h2 style='color: #d4af37;'>Global Compass AI</h2><p>Dear <strong>${name}</strong>,</p><p>Your premium consultation request has been successfully received. Our AI Concierge is currently evaluating your jurisdiction preferences and eligibility parameters.</p><p>A dedicated executive will review your profile and reach out shortly.</p><br/><p>Best regards,<br/><strong>The Global Compass AI Team</strong></p></div>`
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
