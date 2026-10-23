import { onRequest as __api_admin___path___js_onRequest } from "/home/user/suvfilter/functions/api/admin/[[path]].js"
import { onRequest as __api_login_js_onRequest } from "/home/user/suvfilter/functions/api/login.js"
import { onRequest as __api_logout_js_onRequest } from "/home/user/suvfilter/functions/api/logout.js"
import { onRequest as __api_requests_js_onRequest } from "/home/user/suvfilter/functions/api/requests.js"
import { onRequest as __api_telegram_js_onRequest } from "/home/user/suvfilter/functions/api/telegram.js"

export const routes = [
    {
      routePath: "/api/admin/:path*",
      mountPath: "/api/admin",
      method: "",
      middlewares: [],
      modules: [__api_admin___path___js_onRequest],
    },
  {
      routePath: "/api/login",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_login_js_onRequest],
    },
  {
      routePath: "/api/logout",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_logout_js_onRequest],
    },
  {
      routePath: "/api/requests",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_requests_js_onRequest],
    },
  {
      routePath: "/api/telegram",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_telegram_js_onRequest],
    },
  ]