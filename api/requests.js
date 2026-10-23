import { adapt } from '../lib/adapt.mjs';
import handler from '../netlify/functions/requests.mjs';
export default adapt(handler);
