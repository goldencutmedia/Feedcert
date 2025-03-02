"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let ActionController = class ActionController {
    constructor(actionRepository) {
        this.actionRepository = actionRepository;
    }
    async create(action) {
        return this.actionRepository.create(action);
    }
    async count(where) {
        return this.actionRepository.count(where);
    }
    async find(filter) {
        return this.actionRepository.find(filter);
    }
    async updateAll(action, where) {
        return this.actionRepository.updateAll(action, where);
    }
    async findById(id) {
        return this.actionRepository.findById(id);
    }
    async updateById(id, action) {
        await this.actionRepository.updateById(id, action);
    }
    async replaceById(id, action) {
        await this.actionRepository.replaceById(id, action);
    }
    async deleteById(id) {
        await this.actionRepository.deleteById(id);
    }
};
exports.ActionController = ActionController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/actions', {
        responses: {
            '200': {
                description: 'Action model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Action) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Action, { exclude: ['id'] }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "create", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/actions/count', {
        responses: {
            '200': {
                description: 'Action model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Action))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "count", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/actions', {
        responses: {
            '200': {
                description: 'Array of Action model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Action) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Action))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "find", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/actions', {
        responses: {
            '200': {
                description: 'Action PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Action, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Action))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Action, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/actions/{id}', {
        responses: {
            '200': {
                description: 'Action model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Action) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/actions/{id}', {
        responses: {
            '204': {
                description: 'Action PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Action, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Action]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.put)('/actions/{id}', {
        responses: {
            '204': {
                description: 'Action PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Action]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/actions/{id}', {
        responses: {
            '204': {
                description: 'Action DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ActionController.prototype, "deleteById", null);
exports.ActionController = ActionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ActionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ActionRepository])
], ActionController);
//# sourceMappingURL=action.controller.js.map