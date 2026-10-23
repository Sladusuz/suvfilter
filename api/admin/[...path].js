import { adapt } from '../../lib/adapt.mjs';
import handler from '../../netlify/functions/admin.mjs';
export default adapt(handler);
