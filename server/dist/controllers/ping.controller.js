"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    greeting: { type: 'string' },
                    date: { type: 'string' },
                    url: { type: 'string' },
                    headers: {
                        type: 'object',
                        properties: {
                            'Content-Type': { type: 'string' },
                        },
                        additionalProperties: true,
                    },
                },
            },
        },
    },
};
/**
 * A simple controller to bounce back http requests
 */
let PingController = class PingController {
    constructor(req) {
        this.req = req;
    }
    // Map to `GET /ping`
    ping() {
        // Reply with a greeting, the current time, the url, and request headers
        return {
            greeting: 'Hello from LoopBack',
            date: new Date(),
            url: this.req.url,
            headers: Object.assign({}, this.req.headers),
        };
    }
};
exports.PingController = PingController;
tslib_1.__decorate([
    (0, rest_1.get)('/ping', {
        responses: {
            '200': PING_RESPONSE,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Object)
], PingController.prototype, "ping", null);
exports.PingController = PingController = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__metadata("design:paramtypes", [Object])
], PingController);
//# sourceMappingURL=ping.controller.js.map