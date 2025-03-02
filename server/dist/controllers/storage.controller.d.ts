import { Request, Response } from '@loopback/rest';
import { Filter } from '@loopback/repository';
import { Container, File } from '../models';
export declare class StorageController {
    request: Request;
    response: Response;
    private storageGcSvc;
    constructor(request: Request, response: Response);
    createContainer(container: Container): Promise<Container>;
    findContainer(filter?: Filter): Promise<Container[]>;
    findContainerByName(containerId: string): Promise<Container>;
    deleteContainerByName(containerId: string): Promise<boolean>;
    findFilesInContainer(containerId: string, filter?: Filter): Promise<File[]>;
    findFileInContainer(containerId: string, fileId: string): Promise<File>;
    deleteFileInContainer(containerId: string, fileId: string): Promise<boolean>;
    uploadToContainer(containerId: string): Promise<File>;
    upload(): Promise<File>;
    download(containerId: string, fileId: string): Promise<any>;
}
