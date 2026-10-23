import '../../lib/netlify-backend.mjs';
import handler from '../../lib/handlers/telegram.mjs';

export const config = { path: '/api/telegram' };
export default handler;
