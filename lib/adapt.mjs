// Runs a Web-standard handler (Request -> Response) as a Vercel Node.js function.
export function adapt(handler) {
  return async (req, res) => {
    try {
      const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
      const host = String(req.headers['x-forwarded-host'] || req.headers.host).split(',')[0];
      const url = `${proto}://${host}${req.url}`;
      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) if (v != null) headers.set(k, Array.isArray(v) ? v.join(', ') : v);

      let body;
      if (!['GET', 'HEAD'].includes(req.method)) {
        if (req.body !== undefined && req.body !== null) { // Vercel may have parsed it already
          body = Buffer.isBuffer(req.body) || typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        } else {
          const chunks = []; for await (const c of req) chunks.push(c); body = Buffer.concat(chunks);
        }
        headers.delete('content-length');
      }
      const response = await handler(new Request(url, { method: req.method, headers, body }));

      res.statusCode = response.status;
      const cookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
      response.headers.forEach((v, k) => { if (k !== 'set-cookie') res.setHeader(k, v); });
      if (cookies.length) res.setHeader('Set-Cookie', cookies);
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (e) {
      console.error('Handler error:', e);
      res.statusCode = 500; res.setHeader('Content-Type', 'application/json'); res.end('{"error":"Server xatosi"}');
    }
  };
}
