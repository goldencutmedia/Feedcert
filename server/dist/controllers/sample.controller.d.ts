import { Count, Filter, Where } from '@loopback/repository';
import { Action, Sample } from '../models';
import { CompanyRepository, SampleRepository, UserRepository } from '../repositories';
export declare class SampleController {
    sampleRepository: SampleRepository;
    companyRepository: CompanyRepository;
    userRepository: UserRepository;
    private mail;
    private storageGcSvc;
    constructor(sampleRepository: SampleRepository, companyRepository: CompanyRepository, userRepository: UserRepository);
    create(sample: Omit<Sample, 'id'>): Promise<Sample>;
    count(where?: Where<Sample>): Promise<Count>;
    find(filter?: Filter<Sample>): Promise<Sample[]>;
    updateAll(sample: Sample, where?: Where<Sample>): Promise<Count>;
    findById(id: string): Promise<Sample>;
    updateById(id: string, sample: Sample): Promise<void>;
    replaceById(id: string, sample: Sample): Promise<void>;
    deleteById(id: string): Promise<void>;
    setAction(id: string, data: {
        action: Action;
    }): Promise<void>;
    private handleMailSender;
    private sendSampleMail;
    private parseBooleanToString;
    private splitSubstances;
}
