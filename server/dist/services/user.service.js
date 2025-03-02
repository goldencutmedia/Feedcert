"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUserService = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const user_repository_1 = require("../repositories/user.repository");
const security_1 = require("@loopback/security");
const repository_1 = require("@loopback/repository");
const keys_1 = require("../keys");
const context_1 = require("@loopback/context");
const repositories_1 = require("../repositories");
let MyUserService = class MyUserService {
    constructor(userRepository, companyRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.passwordHasher = passwordHasher;
    }
    async verifyCredentials(userCredentials) {
        const invalidUserCredentialsError = 'Benutzername oder Passwort falsch.';
        const foundUser = await this.userRepository.findOne({
            where: { username: userCredentials.id },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidUserCredentialsError);
        }
        const passwordMatched = await this.passwordHasher.comparePassword(userCredentials.password, foundUser.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidUserCredentialsError);
        }
        return foundUser;
    }
    convertToUserProfile(user) {
        // since first name and lastName are optional, no error is thrown if not provided
        return {
            [security_1.securityId]: user.username,
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            username: user.username,
            email: user.email,
            roles: user.roles,
        };
    }
};
exports.MyUserService = MyUserService;
exports.MyUserService = MyUserService = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(user_repository_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.CompanyRepository)),
    tslib_1.__param(2, (0, context_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__metadata("design:paramtypes", [user_repository_1.UserRepository,
        repositories_1.CompanyRepository, Object])
], MyUserService);
//# sourceMappingURL=user.service.js.map