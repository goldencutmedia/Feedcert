"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_LEVEL = exports.LogBindings = exports.UserServiceBindings = exports.PasswordHasherBindings = exports.TokenServiceBindings = exports.TokenServiceConstants = void 0;
const context_1 = require("@loopback/context");
var TokenServiceConstants;
(function (TokenServiceConstants) {
    TokenServiceConstants.TOKEN_SECRET_VALUE = 'myjwts3cr3t';
    TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE = '24h';
})(TokenServiceConstants || (exports.TokenServiceConstants = TokenServiceConstants = {}));
var TokenServiceBindings;
(function (TokenServiceBindings) {
    TokenServiceBindings.TOKEN_SECRET = context_1.BindingKey.create('authentication.jwt.secret');
    TokenServiceBindings.TOKEN_EXPIRES_IN = context_1.BindingKey.create('authentication.jwt.expires.in.hours');
    TokenServiceBindings.TOKEN_SERVICE = context_1.BindingKey.create('services.authentication.jwt.tokenservice');
})(TokenServiceBindings || (exports.TokenServiceBindings = TokenServiceBindings = {}));
var PasswordHasherBindings;
(function (PasswordHasherBindings) {
    PasswordHasherBindings.PASSWORD_HASHER = context_1.BindingKey.create('services.hasher');
    PasswordHasherBindings.ROUNDS = context_1.BindingKey.create('services.hasher.round');
})(PasswordHasherBindings || (exports.PasswordHasherBindings = PasswordHasherBindings = {}));
var UserServiceBindings;
(function (UserServiceBindings) {
    UserServiceBindings.USER_SERVICE = context_1.BindingKey.create('services.user.service');
})(UserServiceBindings || (exports.UserServiceBindings = UserServiceBindings = {}));
var LogBindings;
(function (LogBindings) {
    LogBindings.APP_LOG_LEVEL = context_1.BindingKey.create('example.log.level');
    LogBindings.TIMER = context_1.BindingKey.create('example.log.timer');
    LogBindings.LOGGER = context_1.BindingKey.create('example.log.logger');
    LogBindings.LOG_ACTION = context_1.BindingKey.create('example.log.action');
    LogBindings.METADATA = 'example.log.metadata';
})(LogBindings || (exports.LogBindings = LogBindings = {}));
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 0] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 1] = "INFO";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["OFF"] = 4] = "OFF";
})(LOG_LEVEL || (exports.LOG_LEVEL = LOG_LEVEL = {}));
//# sourceMappingURL=keys.js.map