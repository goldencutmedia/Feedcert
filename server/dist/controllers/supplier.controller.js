"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let SupplierController = class SupplierController {
    constructor(supplierRepository, ratingRepository) {
        this.supplierRepository = supplierRepository;
        this.ratingRepository = ratingRepository;
    }
    async create(supplier) {
        const count = await this.supplierRepository.count();
        let number = 1000 + count.count + 1;
        supplier.number = 'LI' + number;
        return this.supplierRepository.create(supplier);
    }
    async count(where) {
        return this.supplierRepository.count(where);
    }
    async find(filter) {
        const include = {
            include: [
                { relation: 'ratings' }
            ]
        };
        if (filter) {
            Object.assign(filter, include);
        }
        else {
            filter = include;
        }
        return this.supplierRepository.find(filter);
    }
    async updateAll(supplier, where) {
        return this.supplierRepository.updateAll(supplier, where);
    }
    async findById(id) {
        return this.supplierRepository.findById(id);
    }
    async updateById(id, supplier) {
        await this.supplierRepository.updateById(id, supplier);
    }
    async replaceById(id, supplier) {
        await this.supplierRepository.replaceById(id, supplier);
    }
    async deleteById(id) {
        await this.supplierRepository.deleteById(id);
    }
    async setRating(id, data) {
        let rating = data.rating;
        return await this.supplierRepository.ratings(id).create(rating);
    }
};
exports.SupplierController = SupplierController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/suppliers', {
        responses: {
            '200': {
                description: 'Supplier model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Supplier) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Supplier, {
                    title: 'NewSupplier',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "create", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/suppliers/count', {
        responses: {
            '200': {
                description: 'Supplier model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Supplier))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "count", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/suppliers', {
        responses: {
            '200': {
                description: 'Array of Supplier model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Supplier) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Supplier))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "find", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/suppliers', {
        responses: {
            '200': {
                description: 'Supplier PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Supplier, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Supplier))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Supplier, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/suppliers/{id}', {
        responses: {
            '200': {
                description: 'Supplier model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Supplier) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/suppliers/{id}', {
        responses: {
            '204': {
                description: 'Supplier PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Supplier, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Supplier]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.put)('/suppliers/{id}', {
        responses: {
            '204': {
                description: 'Supplier PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Supplier]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/suppliers/{id}', {
        responses: {
            '204': {
                description: 'Supplier DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/suppliers/{id}/rating', {
        responses: {
            '200': {
                description: 'Supplier model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Supplier) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SupplierController.prototype, "setRating", null);
exports.SupplierController = SupplierController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SupplierRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.RatingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SupplierRepository,
        repositories_1.RatingRepository])
], SupplierController);
//# sourceMappingURL=supplier.controller.js.map