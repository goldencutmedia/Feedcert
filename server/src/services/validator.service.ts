import {UserCredentials} from '../repositories/user.repository';
import {HttpErrors} from '@loopback/rest';

export function validateCredentials(credentials: UserCredentials) {
    // Validate Email
    if (!credentials.id || credentials.id.length <= 0) {
        throw new HttpErrors.UnprocessableEntity('invalid userid');
    }

    // Validate Password Length
    if (!credentials.password || credentials.password.length <= 0) {
        throw new HttpErrors.UnprocessableEntity(
            'invalid password',
        );
    }
}
