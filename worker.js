const ALLOWED_ORIGINS = new Set([
  'https://stormyguard.com',
  'https://www.stormyguard.com',
]);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    let payload;
    try { payload = await request.json(); }
    catch {
      return new Response(JSON.stringify({ ok: false }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { url, domain, email, notes } = payload;

    if (!env.RESEND_API_KEY) {
      console.log('missing RESEND_API_KEY');
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const safeUrl = escapeHtml(url);
    const safeDomain = escapeHtml(domain);
    const safeEmail = escapeHtml(email);
    const safeNotes = escapeHtml(notes);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Stormy Guard <notifications@stormyguard.com>',
        to: ['peter@stormyguard.com'],
        subject: `New audit request: ${domain}`,
        html: `
          <h2 style="font-family:sans-serif;margin:0 0 16px">New audit request</h2>
          <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
            <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap">URL</td><td>${safeUrl}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap">Domain</td><td>${safeDomain}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap">Email</td><td>${safeEmail}</td></tr>
            ${notes ? `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top;white-space:nowrap">Notes</td><td>${safeNotes}</td></tr>` : ''}
          </table>`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.log('resend_error', res.status, errText);
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
