"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const mail_1 = require("../mail/mail");
const context_1 = require("@loopback/context");
const authentication_1 = require("@loopback/authentication");
let SampleController = class SampleController {
    constructor(sampleRepository, companyRepository, userRepository) {
        this.sampleRepository = sampleRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.mail = new mail_1.Mail();
    }
    async create(sample) {
        this.companyRepository.findById(sample.companyId)
            .then((company) => {
            this.handleMailSender(sample, company);
        });
        return this.sampleRepository.create(sample);
    }
    async count(where) {
        return this.sampleRepository.count(where);
    }
    async find(filter) {
        const include = {
            include: [
                { relation: 'company' },
                { relation: 'actions' }
            ]
        };
        if (filter) {
            Object.assign(filter, include);
        }
        else {
            filter = include;
        }
        return this.sampleRepository.find(filter);
    }
    async updateAll(sample, where) {
        return this.sampleRepository.updateAll(sample, where);
    }
    async findById(id) {
        return this.sampleRepository.findById(id);
    }
    async updateById(id, sample) {
        await this.sampleRepository.updateById(id, sample);
    }
    async replaceById(id, sample) {
        await this.sampleRepository.replaceById(id, sample);
    }
    async deleteById(id) {
        await this.sampleRepository.deleteById(id);
    }
    async setAction(id, data) {
        let action = data.action;
        action.sampleId = id;
        action.creationDate = new Date();
        await this.sampleRepository.actions(id).create(action);
        return this.sampleRepository.updateById(id, {
            state: action.state || -1
        });
    }
    async handleMailSender(sample, company) {
        let valueTooHigh = false;
        if (sample.gvo && sample.gvo >= 0.3) {
            valueTooHigh = true;
        }
        if (sample.substances) {
            let value = 0;
            for (const substance of sample.substances) {
                value += substance.substancevalue;
            }
            if (value >= 0.03) {
                valueTooHigh = true;
            }
        }
        if (valueTooHigh) {
            this.sendSampleMail(sample, company);
        }
    }
    async sendSampleMail(sample, company) {
        let to = '';
        const users = await this.userRepository.find();
        for (let user of users) {
            if (user && user.roles.includes('TASKFORCE')) {
                to += user.email + ',';
            }
        }
        let html = 'Sehr geehrter Damen und Herren!<br><br>' +
            'Hiermit übermitteln wir Ihnen die folgenden Partiedaten:<br><br>';
        if (sample.type === 'single') {
            const date = new Date(sample.reportdate || 0);
            const deliverydate = new Date(sample.deliverydate || 0);
            html += `<b>Produktbeschreibung</b>
                    Typ: Einzelfuttermittel<br>
                    Prüfberichtsnummer: ${sample.number}<br>
                    Beschreibung: ${sample.description}<br>
                    Datum Bericht: ${date.toLocaleDateString()}<br><br>
                    
                    <b>Lieferinformationen</b><br>
                    Lieferant: ${sample.supplierId}<br>
                    Lieferdatum: ${deliverydate.toLocaleDateString()}<br>
                    Transportmittel: ${sample.transportation}<br>
                    Artikelnummer: ${sample.article}<br>
                    Menge (to): ${sample.amount}<br>
                    Geliefert als: ${sample.deliveredAs}<br>
                    Geliefert an: ${sample.deliveredTo}<br>
                    In Quarantäne im eigenen Werk: ${this.parseBooleanToString(sample.quarantine)}<br>
                    Teil einer Silopartie: ${this.parseBooleanToString(sample.silopart)}<br>
                    Teilmenge verarbeitet und nicht ausgeliefert: ${this.parseBooleanToString(sample.partlydelivered)}<br>
                    Einzelfuttermittel verarbeitet und nicht ausgeliefert: ${this.parseBooleanToString(sample.singlefeed)}<br><br>
                    
                    <b>Analyseergebnisse</b><br>
                    GVO: ${sample.gvo} &<br>
                    Wirkstoffe:<br> ${this.splitSubstances(sample.substances)}<br>`;
        }
        if (sample.type === 'mix') {
            const date = new Date(sample.reportdate || 0);
            const deliveredfrom = new Date(sample.deliverydateend || 0);
            const deliveredto = new Date(sample.deliverydateend || 0);
            html += `<b>Produktbeschreibung</b><br>
                    Typ: Mischfuttermittel<br>
                    Prüfberichtsnummer: ${sample.number}<br>
                    Beschreibung: ${sample.description}<br>
                    Datum Bericht: ${date.toLocaleDateString()}<br><br>
                    
                    <b>Lieferinformationen</b><br>
                    Lieferbeginn: ${deliveredfrom.toLocaleDateString()}<br>
                    Lieferende: ${deliveredto.toLocaleDateString()}<br>
                    Menge (to): ${sample.amount}<br><br>
                    
                    <b>Analyseergebnisse</b><br>
                    GVO: ${sample.gvo} %<br>
                    Wirkstoffe:<br> ${this.splitSubstances(sample.substances)}<br>`;
        }
        html += '<br>Bitte wählen Sie sich zur weiteren Beratung um 14.00 Uhr mit folgenden Einwahldaten in die Task Force Telefonnumer ein:<br>' +
            'Telefonnummer<br>' +
            'Einwahlcode<br>' +
            '<br>Mit freundlichen Grüssen<br><br>' +
            '<br>GO+ ZERT<br>' +
            'Das QHS System der GOETE e. V.';
        // let attachments: { filename: string; path: string; }[] = [];
        // const getFile = promisify(this.storageGcSvc.getFile);
        // if (company.id && sample.documentIds && sample.documentIds[0]) {
        //     await getFile(company.id, sample.documentIds[0])
        //         .then((file) => {
        //             console.log(file.url);
        //             if (file.url) {
        //                 attachments.push(
        //                     {
        //                         filename: 'Analysebericht_' + sample.type + '_' + company.number,
        //                         path: file.url || ''
        //                     }
        //                 );
        //             }
        //         });
        // }
        const data = {
            from: '"GOETE PLUS Portal" <info@gopluszert.de>',
            to: to,
            subject: `GOETE PLUS Portal | Neue Analyse von ${company.name} wurde angelegt!`,
            html: html,
            // attachments: attachments
        };
        let message = '';
        this.mail.send(data).then(() => {
        }, (error) => {
            message = error;
            console.log(message);
        });
    }
    parseBooleanToString(bool) {
        return bool ? 'Ja' : 'Nein';
    }
    splitSubstances(substances) {
        let html = '';
        if (substances) {
            for (const substance of substances) {
                html += `${substance.substancename}: ${substance.substancevalue} mg/kg<br>`;
            }
        }
        return html;
    }
};
exports.SampleController = SampleController;
tslib_1.__decorate([
    (0, context_1.inject)('services.StorageService'),
    tslib_1.__metadata("design:type", Object)
], SampleController.prototype, "storageGcSvc", void 0);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/samples', {
        responses: {
            '200': {
                description: 'Sample model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Sample) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Sample, { exclude: ['id'] }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "create", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/samples/count', {
        responses: {
            '200': {
                description: 'Sample model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Sample))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "count", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/samples', {
        responses: {
            '200': {
                description: 'Array of Sample model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Sample) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.Sample))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "find", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/samples', {
        responses: {
            '200': {
                description: 'Sample PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Sample, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Sample))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Sample, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/samples/{id}', {
        responses: {
            '200': {
                description: 'Sample model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Sample) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "findById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/samples/{id}', {
        responses: {
            '204': {
                description: 'Sample PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Sample, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Sample]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.put)('/samples/{id}', {
        responses: {
            '204': {
                description: 'Sample PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Sample]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.del)('/samples/{id}', {
        responses: {
            '204': {
                description: 'Sample DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/samples/{id}/action', {
        responses: {
            '200': {
                description: 'Sample model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Sample) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SampleController.prototype, "setAction", null);
exports.SampleController = SampleController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.SampleRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.CompanyRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SampleRepository,
        repositories_1.CompanyRepository,
        repositories_1.UserRepository])
], SampleController);
//# sourceMappingURL=sample.controller.js.map