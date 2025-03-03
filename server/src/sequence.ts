import {config, Context, inject} from '@loopback/context';
import {
    FindRoute,
    InvokeMethod,
    ParseParams,
    Reject,
    RequestContext,
    Send,
    SequenceHandler,
} from '@loopback/rest';
import {MiddlewareSequence} from '@loopback/rest';
import {RestBindings} from '@loopback/rest';
import {InvokeMiddleware} from '@loopback/rest';
import {InvokeMiddlewareOptions} from '@loopback/rest';

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
        protected authenticateRequest: AuthenticateFn,) {
            super(context, invokeMiddleware, options);
        }

    async handle(context: RequestContext) {
        try {
            const {request, response} = context;
            this.setResponseHeaders(response);

            const route = this.findRoute(request);

            // call authenticateFn
            await this.authenticateRequest(request);

            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
            await super.handle(context);
        } catch (error) {
            if (
                error.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
                error.code === USER_PROFILE_NOT_FOUND
            ) {
                Object.assign(error, {statusCode: 401 /* Unauthorized */});
            }
            this.reject(context, error);
        }
    }

    private setResponseHeaders(response: any) {
//Website you wish to allow to connect
        response.setHeader('Access-Control-Allow-Origin', '*');

        //Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        //Request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        //Set to true if you need the website to include cookies in the requests sent
        //to the API (e.g. in case you use sessions)
        response.setHeader('Access-Control-Allow-Credentials', 'true');
    }
}
