"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const corsMiddleware = async (ctx, next) => {
    if (ctx.request.method === 'OPTIONS') {
        ctx.response
            .status(200)
            .header('Access-Control-Allow-Origin', 'http://localhost:4200')
            .header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
            .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            .header('Access-Control-Max-Age', '86400');
        return ctx.response.end();
    }
    return next();
};
exports.corsMiddleware = corsMiddleware;
//# sourceMappingURL=cors.middleware.js.map