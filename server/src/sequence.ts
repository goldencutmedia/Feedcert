import { config, Context, inject } from '@loopback/context';
import {
    FindRoute,
    InvokeMethod,
    ParseParams,
    Reject,
    RequestContext,
    RestBindings,
    Send,
    InvokeMiddleware,
    InvokeMiddlewareOptions,
    SequenceHandler
} from '@loopback/rest';
import { MiddlewareSequence } from '@loopback/rest';
import {
    AuthenticateFn,
    AUTHENTICATION_STRATEGY_NOT_FOUND,
    AuthenticationBindings,
    USER_PROFILE_NOT_FOUND
} from '@loopback/authentication';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence extends MiddlewareSequence implements SequenceHandler {
    constructor(
        @inject.context() context: Context,
        @inject(RestBindings.INVOKE_MIDDLEWARE_SERVICE)
        invokeMiddleware: InvokeMiddleware,
        @config()
        options: InvokeMiddlewareOptions = MiddlewareSequence.defaultOptions,
        @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
        @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
        @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
        @inject(SequenceActions.SEND) public send: Send,
        @inject(SequenceActions.REJECT) public reject: Reject,
        @inject(AuthenticationBindings.AUTH_ACTION)
        protected authenticateRequest: AuthenticateFn,
    ) {
        super(context, invokeMiddleware, options);
    }

    async handle(context: RequestContext) {
        try {
            const { request, response } = context;

            // Middleware vor REST-Handling ausführen
            await super.handle(context);

            const route = this.findRoute(request);
            await this.authenticateRequest(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);

        } catch (error) {
            this.handleError(error, context);
        }
    }

    private handleError(error: Error, context: RequestContext) {
        const errorCodes = [
            AUTHENTICATION_STRATEGY_NOT_FOUND,
            USER_PROFILE_NOT_FOUND
        ];

        Object.assign(error, { statusCode: 401 });

        this.reject(context, error);
    }
}
