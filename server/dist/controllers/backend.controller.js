"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const dist_1 = require("@loopback/rest/dist");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
const context_1 = require("@loopback/context");
const keys_1 = require("../keys");
const BACKEND_URL = 'backend';
let BackendController = class BackendController {
    constructor(userRepository, companyRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.passwordHasher = passwordHasher;
    }
    async register(user) {
        let foundUser = await this.userRepository.findOne({ where: { username: user.username } });
        if (!foundUser) {
            const hashPassword = await this.passwordHasher.hashPassword(user.password);
            await this.userRepository.create(new models_1.User({
                username: user.username,
                password: hashPassword,
                firstname: user.firstname,
                lastname: user.lastname,
                companyId: user.companyId,
                roles: ['STANDARD']
            }));
            return {
                success: true
            };
        }
        else {
            throw new dist_1.HttpErrors.NotAcceptable('Benutzername bereits vorhanden');
        }
    }
};
exports.BackendController = BackendController;
tslib_1.__decorate([
    (0, rest_1.post)(BACKEND_URL + '/register'),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], BackendController.prototype, "register", null);
exports.BackendController = BackendController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.CompanyRepository)),
    tslib_1.__param(2, (0, context_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.CompanyRepository, Object])
], BackendController);
//# sourceMappingURL=backend.controller.js.map