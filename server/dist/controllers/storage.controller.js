"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const models_1 = require("../models");
const authentication_1 = require("@loopback/authentication");
let StorageController = class StorageController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    async createContainer(container) {
        const createContainer = (0, util_1.promisify)(this.storageGcSvc.createContainer);
        return await createContainer(container);
    }
    async findContainer(filter) {
        const getContainers = (0, util_1.promisify)(this.storageGcSvc.getContainers);
        return await getContainers();
    }
    async findContainerByName(containerId) {
        const getContainer = (0, util_1.promisify)(this.storageGcSvc.getContainer);
        return await getContainer(containerId);
    }
    async deleteContainerByName(containerId) {
        const destroyContainer = (0, util_1.promisify)(this.storageGcSvc.destroyContainer);
        return await destroyContainer(containerId);
    }
    async findFilesInContainer(containerId, filter) {
        const getFiles = (0, util_1.promisify)(this.storageGcSvc.getFiles);
        const files = await getFiles(containerId, {});
        return files;
    }
    async findFileInContainer(containerId, fileId) {
        const getFile = (0, util_1.promisify)(this.storageGcSvc.getFile);
        return await getFile(containerId, fileId);
    }
    async deleteFileInContainer(containerId, fileId) {
        const removeFile = (0, util_1.promisify)(this.storageGcSvc.removeFile);
        return await removeFile(containerId, fileId);
    }
    async uploadToContainer(containerId) {
        const upload = (0, util_1.promisify)(this.storageGcSvc.upload);
        return await upload(containerId, this.request, this.response, {});
    }
    async upload() {
        const upload = (0, util_1.promisify)(this.storageGcSvc.upload);
        return await upload('upload', this.request, this.response, {});
    }
    async download(containerId, fileId) {
        const download = (0, util_1.promisify)(this.storageGcSvc.download);
        return await download(containerId, fileId, this.request, this.response);
    }
};
exports.StorageController = StorageController;
tslib_1.__decorate([
    (0, core_1.inject)('services.StorageService'),
    tslib_1.__metadata("design:type", Object)
], StorageController.prototype, "storageGcSvc", void 0);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/containers', {
        responses: {
            '200': {
                description: 'Container model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Container } } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Container]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "createContainer", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/containers', {
        responses: {
            '200': {
                description: 'Array of Containers model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Container } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Container))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "findContainer", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/containers/{containerId}', {
        responses: {
            '200': {
                description: 'Container model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Container } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "findContainerByName", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/containers/{containerId}', {
        responses: {
            '204': {
                description: 'Container DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "deleteContainerByName", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/containers/{containerId}/files', {
        responses: {
            '200': {
                description: 'Array of Files model instances belongs to container',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.File } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__param(1, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Container))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "findFilesInContainer", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/containers/{containerId}/files/{fileId}', {
        responses: {
            '200': {
                description: 'File model instances belongs to container',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.File } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__param(1, rest_1.param.path.string('fileId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "findFileInContainer", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/containers/{containerId}/files/{fileId}', {
        responses: {
            '204': {
                description: 'File DELETE from Container success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__param(1, rest_1.param.path.string('fileId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "deleteFileInContainer", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/containers/{containerId}/upload', {
        responses: {
            '200': {
                description: 'Upload a Files model instances into Container',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.File } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "uploadToContainer", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/containers/upload', {
        responses: {
            '200': {
                description: 'Upload a Files model instances into Container',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.File } } },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "upload", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/containers/{containerId}/download/{fileId}', {
        responses: {
            '200': {
                description: 'Download a File within specified Container',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('containerId')),
    tslib_1.__param(1, rest_1.param.path.string('fileId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "download", null);
exports.StorageController = StorageController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], StorageController);
//# sourceMappingURL=storage.controller.js.map