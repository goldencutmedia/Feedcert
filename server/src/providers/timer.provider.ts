import {Provider} from '@loopback/context';
import {TimerFn, HighResTime} from '../types';

export class TimerProvider implements Provider<TimerFn> {
    constructor() {}
    value(): TimerFn {
        return (start?: HighResTime): HighResTime => {
            if (!start) return process.hrtime();
            return process.hrtime(start);
        };
    }
}
