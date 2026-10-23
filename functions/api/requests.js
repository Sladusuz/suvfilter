import { cf } from '../../lib/cf.mjs';
import handler from '../../lib/handlers/requests.mjs';
export const onRequest = cf(handler);
