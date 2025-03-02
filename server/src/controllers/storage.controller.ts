import {inject} from '@loopback/core';
import {del, get, getFilterSchemaFor, param, post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import {Filter} from '@loopback/repository';
import {promisify} from 'util';

import {IStorageService} from '../interfaces';
import {Container, File} from '../models';
import {authenticate} from '@loopback/authentication';


export class StorageController {
    @inject('services.StorageService')
    private storageGcSvc: IStorageService;

    constructor(@inject(RestBindings.Http.REQUEST) public request: Request,
                @inject(RestBindings.Http.RESPONSE) public response: Response) {
    }

    @authenticate('jwt')
    @post('/containers', {
        responses: {
            '200': {
                description: 'Container model instance',
                content: {'application/json': {schema: {'x-ts-type': Container}}},
            },
        },
    })
    async createContainer(@requestBody() container: Container): Promise<Container> {
        const createContainer = promisify(this.storageGcSvc.createContainer);
        return await createContainer(container);
    }

    @authenticate('jwt')
    @get('/containers', {
        responses: {
            '200': {
                description: 'Array of Containers model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': Container}},
                    },
                },
            },
        },
    })
    async findContainer(@param.query.object('filter', getFilterSchemaFor(Container)) filter?: Filter): Promise<Container[]> {
        const getContainers = promisify(this.storageGcSvc.getContainers);
        return await getContainers();
    }

    @authenticate('jwt')
    @get('/containers/{containerId}', {
        responses: {
            '200': {
                description: 'Container model instance',
                content: {'application/json': {schema: {'x-ts-type': Container}}},
            },
        },
    })
    async findContainerByName(@param.path.string('containerId') containerId: string): Promise<Container> {
        const getContainer = promisify(this.storageGcSvc.getContainer);
        return await getContainer(containerId);
    }

    @authenticate('jwt')
    @del('/containers/{containerId}', {
        responses: {
            '204': {
                description: 'Container DELETE success',
            },
        },
    })
    async deleteContainerByName(@param.path.string('containerId') containerId: string): Promise<boolean> {
        const destroyContainer = promisify(this.storageGcSvc.destroyContainer);
        return await destroyContainer(containerId);
    }

    @authenticate('jwt')
    @get('/containers/{containerId}/files', {
        responses: {
            '200': {
                description: 'Array of Files model instances belongs to container',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': File}},
                    },
                },
            },
        },
    })
    async findFilesInContainer(@param.path.string('containerId') containerId: string,
                               @param.query.object('filter', getFilterSchemaFor(Container)) filter?: Filter): Promise<File[]> {
        const getFiles = promisify(this.storageGcSvc.getFiles);
        const files = await getFiles(containerId, {});
        return files;
    }

    @authenticate('jwt')
    @get('/containers/{containerId}/files/{fileId}', {
        responses: {
            '200': {
                description: 'File model instances belongs to container',
                content: {'application/json': {schema: {'x-ts-type': File}}},
            },
        },
    })
    async findFileInContainer(@param.path.string('containerId') containerId: string,
                              @param.path.string('fileId') fileId: string): Promise<File> {
        const getFile = promisify(this.storageGcSvc.getFile);
        return await getFile(containerId, fileId);
    }

    @authenticate('jwt')
    @del('/containers/{containerId}/files/{fileId}', {
        responses: {
            '204': {
                description: 'File DELETE from Container success',
            },
        },
    })
    async deleteFileInContainer(@param.path.string('containerId') containerId: string,
                                @param.path.string('fileId') fileId: string): Promise<boolean> {
        const removeFile = promisify(this.storageGcSvc.removeFile);
        return await removeFile(containerId, fileId);
    }

    @authenticate('jwt')
    @post('/containers/{containerId}/upload', {
        responses: {
            '200': {
                description: 'Upload a Files model instances into Container',
                content: {'application/json': {schema: {'x-ts-type': File}}},
            },
        },
    })
    async uploadToContainer(@param.path.string('containerId') containerId: string): Promise<File> {
        const upload = promisify(this.storageGcSvc.upload);
        return await upload(containerId, this.request, this.response, {});
    }

    @authenticate('jwt')
    @post('/containers/upload', {
        responses: {
            '200': {
                description: 'Upload a Files model instances into Container',
                content: {'application/json': {schema: {'x-ts-type': File}}},
            },
        },
    })
    async upload(): Promise<File> {
        const upload = promisify(this.storageGcSvc.upload);
        return await upload('upload', this.request, this.response, {});
    }

    @authenticate('jwt')
    @get('/containers/{containerId}/download/{fileId}', {
        responses: {
            '200': {
                description: 'Download a File within specified Container',
                content: {'application/json': {schema: {'x-ts-type': Object}}},
            },
        },
    })
    async download(@param.path.string('containerId') containerId: string,
                   @param.path.string('fileId') fileId: string): Promise<any> {
        const download = promisify(this.storageGcSvc.download);
        return await download(containerId, fileId, this.request, this.response);
    }
}
