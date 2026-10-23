import { cf } from '../../lib/cf.mjs';
import handler from '../../lib/handlers/admin.mjs';
export const onRequest = cf(handler);
