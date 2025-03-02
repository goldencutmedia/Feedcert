import {BindingKey} from '@loopback/context';
import {PasswordHasher} from './services/hash.password.bcryptjs';
import {TokenService, UserService} from '@loopback/authentication';
import {User} from './models';
import {UserCredentials} from './repositories';
import {LogFn, LogWriterFn, TimerFn} from './types';

export namespace TokenServiceConstants {
    export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
    export const TOKEN_EXPIRES_IN_VALUE = '24h';
}

export namespace TokenServiceBindings {
    export const TOKEN_SECRET = BindingKey.create<string>(
        'authentication.jwt.secret',
    );
    export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
        'authentication.jwt.expires.in.hours',
    );
    export const TOKEN_SERVICE = BindingKey.create<TokenService>(
        'services.authentication.jwt.tokenservice',
    );
}

export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
        'services.hasher',
    );
    export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
    export const USER_SERVICE = BindingKey.create<UserService<User, UserCredentials>>(
        'services.user.service',
    );
}

export namespace LogBindings {
    export const APP_LOG_LEVEL = BindingKey.create<LOG_LEVEL>(
        'example.log.level',
    );
    export const TIMER = BindingKey.create<TimerFn>('example.log.timer');
    export const LOGGER = BindingKey.create<LogWriterFn>('example.log.logger');
    export const LOG_ACTION = BindingKey.create<LogFn>('example.log.action');
    export const METADATA = 'example.log.metadata';
}


export enum LOG_LEVEL {
    DEBUG,
    INFO,
    WARN,
    ERROR,
    OFF,
}

