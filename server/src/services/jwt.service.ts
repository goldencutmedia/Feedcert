import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {promisify} from 'util';
import {TokenService} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
import {TokenServiceBindings} from '../keys';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SECRET)
        private jwtSecret: string,
        @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
        private jwtExpiresIn: string,
    ) {
    }

    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token: 'token' is null`,
            );
        }

        let userProfile: any;

        try {
            // decode user profile from token
            const decryptedToken = await verifyAsync(token, this.jwtSecret);
            // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
            userProfile = Object.assign(
                {id: '', name: ''},
                {id: decryptedToken.id, name: decryptedToken.name},
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token: ${error.message}`,
            );
        }

        return userProfile;
    }

    async generateToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized(
                'Error generating token: userProfile is null',
            );
        }

        // Generate a JSON Web Token
        let token: string;
        try {
            token = await signAsync(userProfile, this.jwtSecret, {
                expiresIn: this.jwtExpiresIn,
            });
        } catch (error) {
            throw new HttpErrors.Unauthorized(`Error encoding token: ${error}`);
        }

        return token;
    }
}
