import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, BindingScope, Context } from '@loopback/core';
import { RestExplorerBindings, RestExplorerComponent, } from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication, RestBindings } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import * as path from 'path';
import { MySequence } from './sequence';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { JWTAuthenticationStrategy } from './authentication-strategies/jwt.strategy';
import {
    LOG_LEVEL,
    LogBindings,
    PasswordHasherBindings,
    TokenServiceBindings,
    TokenServiceConstants,
    UserServiceBindings
} from './keys';
import { JWTService } from './services/jwt.service';
import { BcryptHasher } from './services/hash.password.bcryptjs';
import { MyUserService } from './services/user.service';
import { LogMixin } from './mixins/log-level.mixin';


export class FeedcertApplication extends LogMixin(BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication))),
) {
    constructor(options: ApplicationConfig = {}) {

        super({
            ...options,
            rest: {
              cors: {
                origin: '*', // Explizite Origin-Angabe
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
                credentials: true, // Für Cookies/JWT
                preflightContinue: false,
                maxAge: 86400
              }
            }
          });

        registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

        this.configureMiddleware();
        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default homeView page
        this.static('/', path.join(__dirname, '../public'));
        this.static('/login', path.join(__dirname, '../login'));

        this.setUpBindings();

        //this.component(RestExplorerComponent);
        this.component(AuthenticationComponent);

        this.projectRoot = __dirname;

        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        console.log('Startup-Sequence Done.');
    }

    private configureMiddleware() {
        this.configure(RestBindings.SEQUENCE).to({
            chain: 'middlewareChain.rest',
            orderedGroups: [
                'sendResponse',
                'cors',
                'apiSpec',
                'findRoute',
                'authentication',
                'parseParams',
                'invokeMethod'
            ]
        });

        // RequestContext explizit binden
        this.bind(RestBindings.Http.CONTEXT)
            .toDynamicValue(() => this.instantiateHttpContext())
            .inScope(BindingScope.SINGLETON);
    }
    private instantiateHttpContext(): Context {
        return new Context(this, 'http.request');
    }

    private setUpBindings() {
        // Customize @loopback/rest-explorer configuration here
        this.bind(RestExplorerBindings.CONFIG).to({
            path: '/explorer',
            useSelfHostedSpec: false
        });

        this.bind(TokenServiceBindings.TOKEN_SECRET).to(
            TokenServiceConstants.TOKEN_SECRET_VALUE,
        );

        this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
            TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
        );

        this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

        // Bind bcrypt hash services - utilized by 'UserController' and 'MyUserService'
        this.bind(PasswordHasherBindings.ROUNDS).to(10);
        this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

        this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);

        this.bind(LogBindings.APP_LOG_LEVEL).to(LOG_LEVEL.INFO);
    }
}
