export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
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
            <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap">URL</td><td>${url}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap">Domain</td><td>${domain}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap">Email</td><td>${email}</td></tr>
            ${notes ? `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top;white-space:nowrap">Notes</td><td>${notes}</td></tr>` : ''}
          </table>`,
      }),
    });

    return new Response(JSON.stringify({ ok: res.ok }), {
      status: res.ok ? 200 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
