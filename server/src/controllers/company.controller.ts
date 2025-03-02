import {Count, CountSchema, Filter, repository, Where,} from '@loopback/repository';
import {
    del,
    get,
    getFilterSchemaFor,
    getModelSchemaRef,
    getWhereSchemaFor,
    param,
    patch,
    post,
    put,
    requestBody,
} from '@loopback/rest';

import {Company} from '../models';
import {CompanyRepository} from '../repositories';
import {Mail} from '../mail/mail';
import {authenticate} from '@loopback/authentication';

export class CompanyController {

    mail: Mail;

    constructor(
        @repository(CompanyRepository)
        public companyRepository: CompanyRepository
    ) {
        this.mail = new Mail();
    }

    @authenticate('jwt')
    @post('/companies', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: {'application/json': {schema: getModelSchemaRef(Company)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Company, {exclude: ['id']}),
                },
            },
        })
            company: Omit<Company, 'id'>,
    ): Promise<Company> {
        let count = company.tempNumber;
        if (!count) {
            count = (await this.companyRepository.count()).count + 1;
        } else {
            delete company.number;
        }
        let number = 1000 + count;
        company.number = 'GO' + number;

        const companyResult = await this.companyRepository.create(company);
        return companyResult;
    }

    @authenticate('jwt')
    @post('/companies/sendmail', {
        responses: {
            '200': {
                description: 'Mail Send Result',
                content: {
                    'application/json': {}
                },
            },
        },
    })
    async sendmail(@requestBody() body: any) {
        await this.companyRepository.findById(body.id).then(
            result => {
                if (result) {
                    this.sendRegisterLink(result);
                }
            }
        );
    }

    @authenticate('jwt')
    @get('/companies/count', {
        responses: {
            '200': {
                description: 'Company model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
    ): Promise<Count> {
        return this.companyRepository.count(where);
    }

    @authenticate('jwt')
    @get('/companies', {
        responses: {
            '200': {
                description: 'Array of Company model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Company)},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Company)) filter?: Filter<Company>,
    ): Promise<Company[]> {
        return this.companyRepository.find(filter);
    }

    @authenticate('jwt')
    @patch('/companies', {
        responses: {
            '200': {
                description: 'Company PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Company, {partial: true}),
                },
            },
        })
            company: Company,
        @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
    ): Promise<Count> {
        return this.companyRepository.updateAll(company, where);
    }

    @authenticate('jwt')
    @get('/companies/{id}', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: {'application/json': {schema: getModelSchemaRef(Company)}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<Company> {
        return this.companyRepository.findById(id);
    }

    @authenticate('jwt')
    @patch('/companies/{id}', {
        responses: {
            '204': {
                description: 'Company PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Company, {partial: true}),
                },
            },
        })
            company: Company,
    ): Promise<void> {
        await this.companyRepository.updateById(id, company);
    }

    @authenticate('jwt')
    @put('/companies/{id}', {
        responses: {
            '204': {
                description: 'Company PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() company: Company,
    ): Promise<void> {
        await this.companyRepository.replaceById(id, company);
    }

    @authenticate('jwt')
    @del('/companies/{id}', {
        responses: {
            '204': {
                description: 'Company DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.companyRepository.deleteById(id);
    }

    private sendRegisterLink(company: Company) {
        const data = {
            from: '"GOETE PLUS Portal" <info@gopluszert.de>',
            to: company.email || '',
            subject: `GOETE PLUS Portal | Ihr Unternehmen ${company.name} wurde angelegt!`,
            html: 'Ihr Unternehmen <b>' + company.name + '</b> ' +
                'mit der Kundennummer ' + company.number + ' wurde angelegt!<br><br>' +
                'Über folgenden Link können Sie einen Benutzer anlegen:<br>' +
                '<a href="http://portal.gopluszert.de/#/register?c=' + company.id +
                '">portal.gopluszert.de/register</a><br><br>' +
                'Bitte verwenden Sie hierzu folgende ID:<br>' +
                company.id
        };
        let message = '';
        this.mail.send(data)
            .then((info) => {
                    message = 'Register Mail for ' + company.number + ' sent to ' + data.to;
                    console.log(message);
                },
                (error) => {
                    message = error;
                    console.log(message);
                });
    }
}

