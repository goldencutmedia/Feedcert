"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const rest_2 = require("@loopback/rest");
const authentication_1 = require("@loopback/authentication");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence extends rest_2.MiddlewareSequence {
    constructor(context, invokeMiddleware, options = rest_2.MiddlewareSequence.defaultOptions, findRoute, parseParams, invoke, send, reject, authenticateRequest) {
        super(context, invokeMiddleware, options);
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            // Middleware vor REST-Handling ausführen
            await super.handle(context);
            const route = this.findRoute(request);
            await this.authenticateRequest(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (error) {
            this.handleError(error, context);
        }
    }
    handleError(error, context) {
        const errorCodes = [
            authentication_1.AUTHENTICATION_STRATEGY_NOT_FOUND,
            authentication_1.USER_PROFILE_NOT_FOUND
        ];
        Object.assign(error, { statusCode: 401 });
        this.reject(context, error);
    }
};
exports.MySequence = MySequence;
exports.MySequence = MySequence = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject.context()),
    tslib_1.__param(1, (0, context_1.inject)(rest_1.RestBindings.INVOKE_MIDDLEWARE_SERVICE)),
    tslib_1.__param(2, (0, context_1.config)()),
    tslib_1.__param(3, (0, context_1.inject)(SequenceActions.FIND_ROUTE)),
    tslib_1.__param(4, (0, context_1.inject)(SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(5, (0, context_1.inject)(SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(6, (0, context_1.inject)(SequenceActions.SEND)),
    tslib_1.__param(7, (0, context_1.inject)(SequenceActions.REJECT)),
    tslib_1.__param(8, (0, context_1.inject)(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    tslib_1.__metadata("design:paramtypes", [context_1.Context, Function, Object, Function, Function, Function, Function, Function, Function])
], MySequence);
//# sourceMappingURL=sequence.js.map