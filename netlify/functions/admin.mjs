import '../../lib/netlify-backend.mjs';
import handler from '../../lib/handlers/admin.mjs';

export const config = { path: ['/api/login', '/api/logout', '/api/admin/*'] };
export default handler;
