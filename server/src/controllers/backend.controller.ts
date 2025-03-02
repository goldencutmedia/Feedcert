import {post, requestBody} from '@loopback/rest';
import {HttpErrors} from "@loopback/rest/dist";
import {repository} from "@loopback/repository";
import {CompanyRepository, UserRepository} from "../repositories";
import {User} from "../models";
import {inject} from "@loopback/context";
import {PasswordHasherBindings} from "../keys";
import {PasswordHasher} from "../services/hash.password.bcryptjs";

const BACKEND_URL = 'backend';

export class BackendController {
    constructor(
        @repository(UserRepository) private userRepository: UserRepository,
        @repository(CompanyRepository) private companyRepository: CompanyRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
    ) {
    }

    @post(BACKEND_URL + '/register')
    async register(@requestBody() user: User) {
        let foundUser = await this.userRepository.findOne({where: {username: user.username}});
        if (!foundUser) {
            const hashPassword = await this.passwordHasher.hashPassword(user.password);
            await this.userRepository.create(new User(
                {
                    username: user.username,
                    password: hashPassword,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    companyId: user.companyId,
                    roles: ['STANDARD']
                }
            ));
            return {
                success: true
            }
        } else {
            throw new HttpErrors.NotAcceptable('Benutzername bereits vorhanden');
        }
    }
}
