import {HttpErrors} from '@loopback/rest';
import {UserCredentials, UserRepository} from '../repositories/user.repository';
import {User} from '../models';
import {UserService} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import {repository} from '@loopback/repository';
import {PasswordHasher} from './hash.password.bcryptjs';
import {PasswordHasherBindings} from '../keys';
import {inject} from '@loopback/context';
import {CompanyRepository} from '../repositories';

export class MyUserService implements UserService<User, UserCredentials> {
    constructor(
        @repository(UserRepository) public userRepository: UserRepository,
        @repository(CompanyRepository) public companyRepository: CompanyRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
    ) {
    }

    async verifyCredentials(userCredentials: UserCredentials): Promise<User> {
        const invalidUserCredentialsError = 'Benutzername oder Passwort falsch.';

        const foundUser = await this.userRepository.findOne({
            where: {username: userCredentials.id},
        });
        if (!foundUser) {
            throw new HttpErrors.Unauthorized(invalidUserCredentialsError);
        }

        const passwordMatched = await this.passwordHasher.comparePassword(
            userCredentials.password,
            foundUser.password,
        );

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(invalidUserCredentialsError);
        }

        return foundUser;
    }

    convertToUserProfile(user: User): UserProfile {
        // since first name and lastName are optional, no error is thrown if not provided
        return {
            [securityId]: user.username,
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            username: user.username,
            email: user.email,
            roles: user.roles,
        };
    }
}
