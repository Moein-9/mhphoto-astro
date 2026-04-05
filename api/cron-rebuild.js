// Vercel Cron Job: Triggers a rebuild via deploy hook
// Runs daily at 9:00 AM UTC (3:00 AM Edmonton MDT / 2:00 AM MST)
// This ensures scheduled blog posts go live on their publishDate

export default async function handler(req, res) {
  // Only allow GET (Vercel cron uses GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify this is called by Vercel Cron (not a random request)
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl) {
    return res.status(500).json({ error: 'VERCEL_DEPLOY_HOOK not configured' });
  }

  try {
    const response = await fetch(hookUrl, { method: 'POST' });
    const data = await response.json();
    return res.status(200).json({ ok: true, job: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
