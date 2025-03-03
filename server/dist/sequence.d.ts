import { Context } from '@loopback/context';
import { FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
import { MiddlewareSequence } from '@loopback/rest';
import { InvokeMiddleware } from '@loopback/rest';
import { InvokeMiddlewareOptions } from '@loopback/rest';
import { AuthenticateFn } from '@loopback/authentication';
export declare class MySequence extends MiddlewareSequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    protected authenticateRequest: AuthenticateFn;
    constructor(context: Context, invokeMiddleware: InvokeMiddleware, options: InvokeMiddlewareOptions | undefined, findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject, authenticateRequest: AuthenticateFn);
    handle(context: RequestContext): Promise<void>;
    private setResponseHeaders;
}
