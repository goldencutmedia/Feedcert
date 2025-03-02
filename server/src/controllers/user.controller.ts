import {Count, CountSchema, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, put, requestBody} from '@loopback/rest';
import {Credentials, User} from '../models';
import {CompanyRepository, UserRepository} from '../repositories';
import {inject} from '@loopback/context';
import {TokenServiceBindings, UserServiceBindings} from '../keys';
import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {CredentialsRequestBody} from './specs/user-controller.specs';


export class UserResult {
    username: string;
    firstname: string;
    lastname: string;
    company?: string | null;
    role?: string | null;
}

export class UserController {
    constructor(
        @repository(UserRepository) private userRepository: UserRepository,
        @repository(CompanyRepository) private companyRepository: CompanyRepository,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: UserService<User, Credentials>,
        @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
        private jwtExpiresIn: string,
    ) {
    }


    @authenticate('jwt')
    @post('/users', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: getModelSchemaRef(User)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {exclude: ['id']}),
                },
            },
        })
            user: Omit<User, 'id'>,
    ): Promise<User> {
        return this.userRepository.create(user);
    }

    @authenticate('jwt')
    @get('/users/count', {
        responses: {
            '200': {
                description: 'User model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
    ): Promise<Count> {
        return this.userRepository.count(where);
    }

    @authenticate('jwt')
    @get('/users', {
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(UserResult)},
                    },
                },
            },
        },
    })
    async find(): Promise<UserResult[]> {
        return this.userRepository.find().then(
            async result => {
                let users: UserResult[] = [];
                for (let user of result) {
                    const tempUser: UserResult = new UserResult();

                    Object.assign(tempUser, user);

                    const company = await this.companyRepository.findOne({where: {id: user.companyId}});
                    tempUser.company = company && company.name;
                    users.push(tempUser);
                }
                return users;
            }
        );
    }

    @authenticate('jwt')
    @patch('/users', {
        responses: {
            '200': {
                description: 'User PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {partial: true}),
                },
            },
        })
            user: User,
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
    ): Promise<Count> {
        return this.userRepository.updateAll(user, where);
    }

    @authenticate('jwt')
    @get('/users/{id}', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: getModelSchemaRef(User)}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<User> {
        return this.userRepository.findById(id);
    }

    @authenticate('jwt')
    @patch('/users/{id}', {
        responses: {
            '204': {
                description: 'User PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(UserResult, {partial: true}),
                },
            },
        })
            userResult: UserResult,
    ): Promise<void> {
        if (userResult && userResult.company) {
            delete userResult.company;
        }
        await this.userRepository.updateById(id, userResult);
    }

    @authenticate('jwt')
    @put('/users/{id}', {
        responses: {
            '204': {
                description: 'User PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() user: User,
    ): Promise<void> {
        await this.userRepository.replaceById(id, user);
    }

    @authenticate('jwt')
    @del('/users/{id}', {
        responses: {
            '204': {
                description: 'User DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.userRepository.deleteById(id);
    }

    @post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                                expiresIn: {
                                    type: 'string'
                                },
                                user: {
                                    type: 'json'
                                }
                            },
                        },
                    },
                },
            },
        },
    })
    async login(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<{ token: string, expiresIn: string, user: string }> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        let company = await this.companyRepository.findById(user.companyId);
        if (company) {
            userProfile.company = company;
        }

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);

        return {token, expiresIn: this.jwtExpiresIn, user: JSON.stringify(userProfile)};
    }
}
