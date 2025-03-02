"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let RatingController = class RatingController {
    constructor(ratingRepository) {
        this.ratingRepository = ratingRepository;
    }
    async create(rating) {
        const count = await this.ratingRepository.count();
        let number = count.count + 1;
        rating.position = '' + number;
        return this.ratingRepository.create(rating);
    }
    async count(where) {
        return this.ratingRepository.count(where);
    }
    async find(filter) {
        return this.ratingRepository.find(filter);
    }
    async updateAll(rating, where) {
        return this.ratingRepository.updateAll(rating, where);
    }
    async findById(id) {
        return this.ratingRepository.findById(id);
    }
    async updateById(id, rating) {
        await this.ratingRepository.updateById(id, rating);
    }
    async replaceById(id, rating) {
        await this.ratingRepository.replaceById(id, rating);
    }
    async deleteById(id) {
        await this.ratingRepository.deleteById(id);
    }
};
exports.RatingController = RatingController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/ratings', {
        responses: {
            '200': {
                description: 'Rating model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Rating) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rating, {
                    title: 'NewRating',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "create", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/ratings/count', {
        responses: {
            '200': {
                description: 'Rating model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Rating))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "count", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/ratings', {
        responses: {
            '200': {
                description: 'Array of Rating model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Rating) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Rating))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "find", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/ratings', {
        responses: {
            '200': {
                description: 'Rating PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rating, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Rating))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Rating, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/ratings/{id}', {
        responses: {
            '200': {
                description: 'Rating model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Rating) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Rating, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Rating]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.put)('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Rating]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "deleteById", null);
exports.RatingController = RatingController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RatingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RatingRepository])
], RatingController);
//# sourceMappingURL=rating.controller.js.map