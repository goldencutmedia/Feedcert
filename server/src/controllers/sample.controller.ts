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
import {Action, Company, Sample} from '../models';
import {CompanyRepository, SampleRepository, UserRepository} from '../repositories';
import {Mail} from "../mail/mail";
import {IStorageService} from "../interfaces";
import {inject} from "@loopback/context";
import {authenticate} from "@loopback/authentication";

export class SampleController {
    private mail: Mail;

    @inject('services.StorageService')
    private storageGcSvc: IStorageService;

    constructor(
        @repository(SampleRepository)
        public sampleRepository: SampleRepository,
        @repository(CompanyRepository)
        public companyRepository: CompanyRepository,
        @repository(UserRepository)
        public userRepository: UserRepository
    ) {
        this.mail = new Mail();
    }

      @authenticate('jwt')
  @post('/samples', {
        responses: {
            '200': {
                description: 'Sample model instance',
                content: {'application/json': {schema: getModelSchemaRef(Sample)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Sample, {exclude: ['id']}),
                },
            },
        })
            sample: Omit<Sample, 'id'>,
    ): Promise<Sample> {
        this.companyRepository.findById(sample.companyId)
            .then((company) => {
                this.handleMailSender(sample, company);
            });
        return this.sampleRepository.create(sample);
    }

      @authenticate('jwt')
  @get('/samples/count', {
        responses: {
            '200': {
                description: 'Sample model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Sample)) where?: Where<Sample>,
    ): Promise<Count> {
        return this.sampleRepository.count(where);
    }

      @authenticate('jwt')
  @get('/samples', {
        responses: {
            '200': {
                description: 'Array of Sample model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Sample)},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Sample)) filter?: Filter<Sample>,
    ): Promise<Sample[]> {
        const include = {
            include: [
                {relation: 'company'},
                {relation: 'actions'}
            ]
        };
        if (filter) {
            Object.assign(filter, include);
        } else {
            filter = include;
        }
        return this.sampleRepository.find(filter);
    }

      @authenticate('jwt')
  @patch('/samples', {
        responses: {
            '200': {
                description: 'Sample PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Sample, {partial: true}),
                },
            },
        })
            sample: Sample,
        @param.query.object('where', getWhereSchemaFor(Sample)) where?: Where<Sample>,
    ): Promise<Count> {
        return this.sampleRepository.updateAll(sample, where);
    }

      @authenticate('jwt')
  @get('/samples/{id}', {
        responses: {
            '200': {
                description: 'Sample model instance',
                content: {'application/json': {schema: getModelSchemaRef(Sample)}},
            },
        },
    })
    async findById(@param.path.number('id') id: string): Promise<Sample> {
        return this.sampleRepository.findById(id);
    }

      @authenticate('jwt')
  @patch('/samples/{id}', {
        responses: {
            '204': {
                description: 'Sample PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Sample, {partial: true}),
                },
            },
        })
            sample: Sample,
    ): Promise<void> {
        await this.sampleRepository.updateById(id, sample);
    }

      @authenticate('jwt')
  @put('/samples/{id}', {
        responses: {
            '204': {
                description: 'Sample PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() sample: Sample,
    ): Promise<void> {
        await this.sampleRepository.replaceById(id, sample);
    }

      @authenticate('jwt')
  @del('/samples/{id}', {
        responses: {
            '204': {
                description: 'Sample DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.sampleRepository.deleteById(id);
    }

      @authenticate('jwt')
  @post('/samples/{id}/action', {
        responses: {
            '200': {
                description: 'Sample model instance',
                content: {'application/json': {schema: getModelSchemaRef(Sample)}},
            },
        },
    })
    async setAction(
        @param.path.string('id') id: string,
        @requestBody() data: { action: Action }
    ) {
        let action: Action = data.action;
        action.sampleId = id;
        action.creationDate = new Date();
        await this.sampleRepository.actions(id).create(action);

        return this.sampleRepository.updateById(id, {
            state: action.state || -1
        });
    }

    private async handleMailSender(sample: Sample, company: Company) {
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

    private async sendSampleMail(sample: Sample, company: Company) {
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
        this.mail.send(data).then(
            () => {
            }

            ,
            (error) => {
                message = error;
                console.log(message);
            });
    }

    private parseBooleanToString(bool: boolean | undefined) {
        return bool ? 'Ja' : 'Nein';
    }

    private splitSubstances(substances: { substancename: string; substancevalue: number }[] | undefined) {
        let html = '';
        if (substances) {
            for (const substance of substances) {
                html += `${substance.substancename}: ${substance.substancevalue} mg/kg<br>`;
            }
        }
        return html;

    }
}
