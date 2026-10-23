import { cf } from '../../lib/cf.mjs';
import handler from '../../lib/handlers/telegram.mjs';
export const onRequest = cf(handler);
