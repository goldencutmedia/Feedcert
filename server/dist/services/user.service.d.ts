import { UserCredentials, UserRepository } from '../repositories/user.repository';
import { User } from '../models';
import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { PasswordHasher } from './hash.password.bcryptjs';
import { CompanyRepository } from '../repositories';
export declare class MyUserService implements UserService<User, UserCredentials> {
    userRepository: UserRepository;
    companyRepository: CompanyRepository;
    passwordHasher: PasswordHasher;
    constructor(userRepository: UserRepository, companyRepository: CompanyRepository, passwordHasher: PasswordHasher);
    verifyCredentials(userCredentials: UserCredentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
}
