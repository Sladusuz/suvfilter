// Cloudflare Pages Functions wrapper: exposes env vars + the KV binding to the shared code.
export function cf(handler) {
  return async ({ request, env }) => {
    globalThis.__ENV = env;
    return handler(request);
  };
}
