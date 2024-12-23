"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@t3-oss+env-core@0.10.1_typescript@5.7.2_zod@3.24.1";
exports.ids = ["vendor-chunks/@t3-oss+env-core@0.10.1_typescript@5.7.2_zod@3.24.1"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@t3-oss+env-core@0.10.1_typescript@5.7.2_zod@3.24.1/node_modules/@t3-oss/env-core/dist/index.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@t3-oss+env-core@0.10.1_typescript@5.7.2_zod@3.24.1/node_modules/@t3-oss/env-core/dist/index.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnv: () => (/* binding */ createEnv)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/.pnpm/zod@3.24.1/node_modules/zod/lib/index.mjs\");\n\n\nfunction createEnv(opts) {\n    const runtimeEnv = opts.runtimeEnvStrict ?? opts.runtimeEnv ?? process.env;\n    const emptyStringAsUndefined = opts.emptyStringAsUndefined ?? false;\n    if (emptyStringAsUndefined) {\n        for (const [key, value] of Object.entries(runtimeEnv)){\n            if (value === \"\") {\n                delete runtimeEnv[key];\n            }\n        }\n    }\n    const skip = !!opts.skipValidation;\n    // biome-ignore lint/suspicious/noExplicitAny: <explanation>\n    if (skip) return runtimeEnv;\n    const _client = typeof opts.client === \"object\" ? opts.client : {};\n    const _server = typeof opts.server === \"object\" ? opts.server : {};\n    const _shared = typeof opts.shared === \"object\" ? opts.shared : {};\n    const client = (0,zod__WEBPACK_IMPORTED_MODULE_0__.object)(_client);\n    const server = (0,zod__WEBPACK_IMPORTED_MODULE_0__.object)(_server);\n    const shared = (0,zod__WEBPACK_IMPORTED_MODULE_0__.object)(_shared);\n    const isServer = opts.isServer ?? (typeof window === \"undefined\" || \"Deno\" in window);\n    const allClient = client.merge(shared);\n    const allServer = server.merge(shared).merge(client);\n    const parsed = isServer ? allServer.safeParse(runtimeEnv) // on server we can validate all env vars\n     : allClient.safeParse(runtimeEnv); // on client we can only validate the ones that are exposed\n    const onValidationError = opts.onValidationError ?? ((error)=>{\n        console.error(\"❌ Invalid environment variables:\", error.flatten().fieldErrors);\n        throw new Error(\"Invalid environment variables\");\n    });\n    const onInvalidAccess = opts.onInvalidAccess ?? ((_variable)=>{\n        throw new Error(\"❌ Attempted to access a server-side environment variable on the client\");\n    });\n    if (parsed.success === false) {\n        return onValidationError(parsed.error);\n    }\n    const isServerAccess = (prop)=>{\n        if (!opts.clientPrefix) return true;\n        return !prop.startsWith(opts.clientPrefix) && !(prop in shared.shape);\n    };\n    const isValidServerAccess = (prop)=>{\n        return isServer || !isServerAccess(prop);\n    };\n    const ignoreProp = (prop)=>{\n        return prop === \"__esModule\" || prop === \"$$typeof\";\n    };\n    const extendedObj = (opts.extends ?? []).reduce((acc, curr)=>{\n        return Object.assign(acc, curr);\n    }, {});\n    const fullObj = Object.assign(parsed.data, extendedObj);\n    const env = new Proxy(fullObj, {\n        get (target, prop) {\n            if (typeof prop !== \"string\") return undefined;\n            if (ignoreProp(prop)) return undefined;\n            if (!isValidServerAccess(prop)) return onInvalidAccess(prop);\n            return Reflect.get(target, prop);\n        }\n    });\n    // biome-ignore lint/suspicious/noExplicitAny: <explanation>\n    return env;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHQzLW9zcytlbnYtY29yZUAwLjEwLjFfdHlwZXNjcmlwdEA1LjcuMl96b2RAMy4yNC4xL25vZGVfbW9kdWxlcy9AdDMtb3NzL2Vudi1jb3JlL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJDQUFNO0FBQ3pCLG1CQUFtQiwyQ0FBTTtBQUN6QixtQkFBbUIsMkNBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRXFCIiwic291cmNlcyI6WyIvVXNlcnMvc2hpcmFlaXNlbmJlcmcvRG9jdW1lbnRzL0dpdEh1Yi9TYW50YUNsYXVkZS9zYW50YS1sZXR0ZXItdDMvbm9kZV9tb2R1bGVzLy5wbnBtL0B0My1vc3MrZW52LWNvcmVAMC4xMC4xX3R5cGVzY3JpcHRANS43LjJfem9kQDMuMjQuMS9ub2RlX21vZHVsZXMvQHQzLW9zcy9lbnYtY29yZS9kaXN0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9iamVjdCB9IGZyb20gJ3pvZCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudihvcHRzKSB7XG4gICAgY29uc3QgcnVudGltZUVudiA9IG9wdHMucnVudGltZUVudlN0cmljdCA/PyBvcHRzLnJ1bnRpbWVFbnYgPz8gcHJvY2Vzcy5lbnY7XG4gICAgY29uc3QgZW1wdHlTdHJpbmdBc1VuZGVmaW5lZCA9IG9wdHMuZW1wdHlTdHJpbmdBc1VuZGVmaW5lZCA/PyBmYWxzZTtcbiAgICBpZiAoZW1wdHlTdHJpbmdBc1VuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhydW50aW1lRW52KSl7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcnVudGltZUVudltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHNraXAgPSAhIW9wdHMuc2tpcFZhbGlkYXRpb247XG4gICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3VzcGljaW91cy9ub0V4cGxpY2l0QW55OiA8ZXhwbGFuYXRpb24+XG4gICAgaWYgKHNraXApIHJldHVybiBydW50aW1lRW52O1xuICAgIGNvbnN0IF9jbGllbnQgPSB0eXBlb2Ygb3B0cy5jbGllbnQgPT09IFwib2JqZWN0XCIgPyBvcHRzLmNsaWVudCA6IHt9O1xuICAgIGNvbnN0IF9zZXJ2ZXIgPSB0eXBlb2Ygb3B0cy5zZXJ2ZXIgPT09IFwib2JqZWN0XCIgPyBvcHRzLnNlcnZlciA6IHt9O1xuICAgIGNvbnN0IF9zaGFyZWQgPSB0eXBlb2Ygb3B0cy5zaGFyZWQgPT09IFwib2JqZWN0XCIgPyBvcHRzLnNoYXJlZCA6IHt9O1xuICAgIGNvbnN0IGNsaWVudCA9IG9iamVjdChfY2xpZW50KTtcbiAgICBjb25zdCBzZXJ2ZXIgPSBvYmplY3QoX3NlcnZlcik7XG4gICAgY29uc3Qgc2hhcmVkID0gb2JqZWN0KF9zaGFyZWQpO1xuICAgIGNvbnN0IGlzU2VydmVyID0gb3B0cy5pc1NlcnZlciA/PyAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBcIkRlbm9cIiBpbiB3aW5kb3cpO1xuICAgIGNvbnN0IGFsbENsaWVudCA9IGNsaWVudC5tZXJnZShzaGFyZWQpO1xuICAgIGNvbnN0IGFsbFNlcnZlciA9IHNlcnZlci5tZXJnZShzaGFyZWQpLm1lcmdlKGNsaWVudCk7XG4gICAgY29uc3QgcGFyc2VkID0gaXNTZXJ2ZXIgPyBhbGxTZXJ2ZXIuc2FmZVBhcnNlKHJ1bnRpbWVFbnYpIC8vIG9uIHNlcnZlciB3ZSBjYW4gdmFsaWRhdGUgYWxsIGVudiB2YXJzXG4gICAgIDogYWxsQ2xpZW50LnNhZmVQYXJzZShydW50aW1lRW52KTsgLy8gb24gY2xpZW50IHdlIGNhbiBvbmx5IHZhbGlkYXRlIHRoZSBvbmVzIHRoYXQgYXJlIGV4cG9zZWRcbiAgICBjb25zdCBvblZhbGlkYXRpb25FcnJvciA9IG9wdHMub25WYWxpZGF0aW9uRXJyb3IgPz8gKChlcnJvcik9PntcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBJbnZhbGlkIGVudmlyb25tZW50IHZhcmlhYmxlczpcIiwgZXJyb3IuZmxhdHRlbigpLmZpZWxkRXJyb3JzKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcIik7XG4gICAgfSk7XG4gICAgY29uc3Qgb25JbnZhbGlkQWNjZXNzID0gb3B0cy5vbkludmFsaWRBY2Nlc3MgPz8gKChfdmFyaWFibGUpPT57XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIuKdjCBBdHRlbXB0ZWQgdG8gYWNjZXNzIGEgc2VydmVyLXNpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgb24gdGhlIGNsaWVudFwiKTtcbiAgICB9KTtcbiAgICBpZiAocGFyc2VkLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBvblZhbGlkYXRpb25FcnJvcihwYXJzZWQuZXJyb3IpO1xuICAgIH1cbiAgICBjb25zdCBpc1NlcnZlckFjY2VzcyA9IChwcm9wKT0+e1xuICAgICAgICBpZiAoIW9wdHMuY2xpZW50UHJlZml4KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICFwcm9wLnN0YXJ0c1dpdGgob3B0cy5jbGllbnRQcmVmaXgpICYmICEocHJvcCBpbiBzaGFyZWQuc2hhcGUpO1xuICAgIH07XG4gICAgY29uc3QgaXNWYWxpZFNlcnZlckFjY2VzcyA9IChwcm9wKT0+e1xuICAgICAgICByZXR1cm4gaXNTZXJ2ZXIgfHwgIWlzU2VydmVyQWNjZXNzKHByb3ApO1xuICAgIH07XG4gICAgY29uc3QgaWdub3JlUHJvcCA9IChwcm9wKT0+e1xuICAgICAgICByZXR1cm4gcHJvcCA9PT0gXCJfX2VzTW9kdWxlXCIgfHwgcHJvcCA9PT0gXCIkJHR5cGVvZlwiO1xuICAgIH07XG4gICAgY29uc3QgZXh0ZW5kZWRPYmogPSAob3B0cy5leHRlbmRzID8/IFtdKS5yZWR1Y2UoKGFjYywgY3Vycik9PntcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYWNjLCBjdXJyKTtcbiAgICB9LCB7fSk7XG4gICAgY29uc3QgZnVsbE9iaiA9IE9iamVjdC5hc3NpZ24ocGFyc2VkLmRhdGEsIGV4dGVuZGVkT2JqKTtcbiAgICBjb25zdCBlbnYgPSBuZXcgUHJveHkoZnVsbE9iaiwge1xuICAgICAgICBnZXQgKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGlnbm9yZVByb3AocHJvcCkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoIWlzVmFsaWRTZXJ2ZXJBY2Nlc3MocHJvcCkpIHJldHVybiBvbkludmFsaWRBY2Nlc3MocHJvcCk7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogPGV4cGxhbmF0aW9uPlxuICAgIHJldHVybiBlbnY7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUVudiB9O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@t3-oss+env-core@0.10.1_typescript@5.7.2_zod@3.24.1/node_modules/@t3-oss/env-core/dist/index.js\n");

/***/ })

};
;