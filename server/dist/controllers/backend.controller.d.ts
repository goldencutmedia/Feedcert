import { CompanyRepository, UserRepository } from "../repositories";
import { User } from "../models";
import { PasswordHasher } from "../services/hash.password.bcryptjs";
export declare class BackendController {
    private userRepository;
    private companyRepository;
    passwordHasher: PasswordHasher;
    constructor(userRepository: UserRepository, companyRepository: CompanyRepository, passwordHasher: PasswordHasher);
    register(user: User): Promise<{
        success: boolean;
    }>;
}
