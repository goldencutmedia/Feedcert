"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedcertApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path = tslib_1.__importStar(require("path"));
const sequence_1 = require("./sequence");
const authentication_1 = require("@loopback/authentication");
const jwt_strategy_1 = require("./authentication-strategies/jwt.strategy");
const keys_1 = require("./keys");
const jwt_service_1 = require("./services/jwt.service");
const hash_password_bcryptjs_1 = require("./services/hash.password.bcryptjs");
const user_service_1 = require("./services/user.service");
const log_level_mixin_1 = require("./mixins/log-level.mixin");
class FeedcertApplication extends (0, log_level_mixin_1.LogMixin)((0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication)))) {
    constructor(options = {}) {
        super(options);
        (0, authentication_1.registerAuthenticationStrategy)(this, jwt_strategy_1.JWTAuthenticationStrategy);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default homeView page
        this.static('/', path.join(__dirname, '../public'));
        this.static('/login', path.join(__dirname, '../login'));
        this.setUpBindings();
        //this.component(RestExplorerComponent);
        this.component(authentication_1.AuthenticationComponent);
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
    setUpBindings() {
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
            useSelfHostedSpec: false
        });
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService);
        // Bind bcrypt hash services - utilized by 'UserController' and 'MyUserService'
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(hash_password_bcryptjs_1.BcryptHasher);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(user_service_1.MyUserService);
        this.bind(keys_1.LogBindings.APP_LOG_LEVEL).to(keys_1.LOG_LEVEL.INFO);
    }
}
exports.FeedcertApplication = FeedcertApplication;
//# sourceMappingURL=application.js.map