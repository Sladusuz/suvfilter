import { adapt } from '../lib/adapt.mjs';
import handler from '../netlify/functions/telegram.mjs';
export default adapt(handler);
