import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, sessionType, eventDate, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const subject = sessionType
      ? `New Inquiry — ${name} · ${sessionType}`
      : `New Inquiry — ${name}`;

    // Send branded email to you
    await resend.emails.send({
      from: 'MH Photography <noreply@mhphoto.ca>',
      to: 'moein@mhphoto.ca',
      replyTo: email,
      subject: subject,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f9f6f2;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f6f2;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1614;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:18px;font-weight:300;color:#c9a86c;letter-spacing:0.15em;">MH PHOTOGRAPHY</p>
              <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;">New Inquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:#f9f6f2;border-radius:10px;border-left:3px solid #c9a86c;">
                    <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#8a8279;">From</p>
                    <p style="margin:0;font-size:17px;font-weight:500;color:#1a1614;">${name}</p>
                    <p style="margin:4px 0 0;font-size:13px;color:#6b5f58;">${email}</p>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td width="50%" style="padding:12px 16px;background:#f9f6f2;border-radius:10px;">
                    <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#8a8279;">Session Type</p>
                    <p style="margin:0;font-size:14px;font-weight:500;color:#1a1614;">${sessionType || 'Not specified'}</p>
                  </td>
                  <td width="10"></td>
                  <td width="50%" style="padding:12px 16px;background:#f9f6f2;border-radius:10px;">
                    <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#8a8279;">Event Date</p>
                    <p style="margin:0;font-size:14px;font-weight:500;color:#1a1614;">${eventDate || 'Not specified'}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px;background:#f9f6f2;border-radius:10px;">
                    <p style="margin:0 0 6px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#8a8279;">Message</p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#3d3632;">${message.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:#1a1614;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:50px;">Reply to ${name}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #eae5df;text-align:center;">
              <p style="margin:0;font-size:11px;color:#8a8279;">Sent from mhphoto.ca contact form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    // Send auto-response to the client
    await resend.emails.send({
      from: 'MH Photography <noreply@mhphoto.ca>',
      to: email,
      replyTo: 'moein@mhphoto.ca',
      subject: `Thanks for reaching out, ${name}!`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9f6f2;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f6f2;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#1a1614;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:18px;font-weight:300;color:#c9a86c;letter-spacing:0.15em;">MH PHOTOGRAPHY</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px;text-align:center;">
              <p style="margin:0 0 16px;font-size:22px;font-weight:300;color:#1a1614;">Hey ${name}!</p>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.8;color:#6b5f58;">Thanks for reaching out — I got your message and I'll get back to you within 24 hours. Looking forward to hearing more about what you're planning!</p>
              <p style="margin:0;font-size:14px;color:#3d3632;">— Moein</p>
              <p style="margin:4px 0 0;font-size:12px;color:#8a8279;">MH Photography · Edmonton, AB</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #eae5df;text-align:center;">
              <a href="https://mhphoto.ca" style="font-size:11px;color:#c9a86c;text-decoration:none;">mhphoto.ca</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
