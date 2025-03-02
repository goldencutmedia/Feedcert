import { BindingKey } from '@loopback/context';
import { PasswordHasher } from './services/hash.password.bcryptjs';
import { TokenService, UserService } from '@loopback/authentication';
import { User } from './models';
import { UserCredentials } from './repositories';
import { LogFn, LogWriterFn, TimerFn } from './types';
export declare namespace TokenServiceConstants {
    const TOKEN_SECRET_VALUE = "myjwts3cr3t";
    const TOKEN_EXPIRES_IN_VALUE = "24h";
}
export declare namespace TokenServiceBindings {
    const TOKEN_SECRET: BindingKey<string>;
    const TOKEN_EXPIRES_IN: BindingKey<string>;
    const TOKEN_SERVICE: BindingKey<TokenService>;
}
export declare namespace PasswordHasherBindings {
    const PASSWORD_HASHER: BindingKey<PasswordHasher<string>>;
    const ROUNDS: BindingKey<number>;
}
export declare namespace UserServiceBindings {
    const USER_SERVICE: BindingKey<UserService<User, UserCredentials>>;
}
export declare namespace LogBindings {
    const APP_LOG_LEVEL: BindingKey<LOG_LEVEL>;
    const TIMER: BindingKey<TimerFn>;
    const LOGGER: BindingKey<LogWriterFn>;
    const LOG_ACTION: BindingKey<LogFn>;
    const METADATA = "example.log.metadata";
}
export declare enum LOG_LEVEL {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    OFF = 4
}
