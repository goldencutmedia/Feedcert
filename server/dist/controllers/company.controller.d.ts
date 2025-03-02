import { Count, Filter, Where } from '@loopback/repository';
import { Company } from '../models';
import { CompanyRepository } from '../repositories';
import { Mail } from '../mail/mail';
export declare class CompanyController {
    companyRepository: CompanyRepository;
    mail: Mail;
    constructor(companyRepository: CompanyRepository);
    create(company: Omit<Company, 'id'>): Promise<Company>;
    sendmail(body: any): Promise<void>;
    count(where?: Where<Company>): Promise<Count>;
    find(filter?: Filter<Company>): Promise<Company[]>;
    updateAll(company: Company, where?: Where<Company>): Promise<Count>;
    findById(id: string): Promise<Company>;
    updateById(id: string, company: Company): Promise<void>;
    replaceById(id: string, company: Company): Promise<void>;
    deleteById(id: string): Promise<void>;
    private sendRegisterLink;
}
