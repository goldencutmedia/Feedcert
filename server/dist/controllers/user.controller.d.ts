import { Count, Where } from '@loopback/repository';
import { Credentials, User } from '../models';
import { CompanyRepository, UserRepository } from '../repositories';
import { TokenService, UserService } from '@loopback/authentication';
export declare class UserResult {
    username: string;
    firstname: string;
    lastname: string;
    company?: string | null;
    role?: string | null;
}
export declare class UserController {
    private userRepository;
    private companyRepository;
    jwtService: TokenService;
    userService: UserService<User, Credentials>;
    private jwtExpiresIn;
    constructor(userRepository: UserRepository, companyRepository: CompanyRepository, jwtService: TokenService, userService: UserService<User, Credentials>, jwtExpiresIn: string);
    create(user: Omit<User, 'id'>): Promise<User>;
    count(where?: Where<User>): Promise<Count>;
    find(): Promise<UserResult[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: string): Promise<User>;
    updateById(id: string, userResult: UserResult): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
    login(credentials: Credentials): Promise<{
        token: string;
        expiresIn: string;
        user: string;
    }>;
}
