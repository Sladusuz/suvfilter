import '../../lib/netlify-backend.mjs';
import handler from '../../lib/handlers/requests.mjs';

export const config = { path: '/api/requests' };
export default handler;
