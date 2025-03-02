"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const mail_1 = require("../mail/mail");
const authentication_1 = require("@loopback/authentication");
let CompanyController = class CompanyController {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
        this.mail = new mail_1.Mail();
    }
    async create(company) {
        let count = company.tempNumber;
        if (!count) {
            count = (await this.companyRepository.count()).count + 1;
        }
        else {
            delete company.number;
        }
        let number = 1000 + count;
        company.number = 'GO' + number;
        const companyResult = await this.companyRepository.create(company);
        return companyResult;
    }
    async sendmail(body) {
        await this.companyRepository.findById(body.id).then(result => {
            if (result) {
                this.sendRegisterLink(result);
            }
        });
    }
    async count(where) {
        return this.companyRepository.count(where);
    }
    async find(filter) {
        return this.companyRepository.find(filter);
    }
    async updateAll(company, where) {
        return this.companyRepository.updateAll(company, where);
    }
    async findById(id) {
        return this.companyRepository.findById(id);
    }
    async updateById(id, company) {
        await this.companyRepository.updateById(id, company);
    }
    async replaceById(id, company) {
        await this.companyRepository.replaceById(id, company);
    }
    async deleteById(id) {
        await this.companyRepository.deleteById(id);
    }
    sendRegisterLink(company) {
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
        }, (error) => {
            message = error;
            console.log(message);
        });
    }
};
exports.CompanyController = CompanyController;
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/companies', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Company) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Company, { exclude: ['id'] }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/companies/sendmail', {
        responses: {
            '200': {
                description: 'Mail Send Result',
                content: {
                    'application/json': {}
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "sendmail", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/companies/count', {
        responses: {
            '200': {
                description: 'Company model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Company))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "count", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/companies', {
        responses: {
            '200': {
                description: 'Array of Company model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Company) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Company))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "find", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/companies', {
        responses: {
            '200': {
                description: 'Company PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Company, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Company))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Company, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/companies/{id}', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Company) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/companies/{id}', {
        responses: {
            '204': {
                description: 'Company PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Company, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Company]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.put)('/companies/{id}', {
        responses: {
            '204': {
                description: 'Company PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Company]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/companies/{id}', {
        responses: {
            '204': {
                description: 'Company DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteById", null);
exports.CompanyController = CompanyController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CompanyRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CompanyRepository])
], CompanyController);
//# sourceMappingURL=company.controller.js.map