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
import {Rating, Supplier} from '../models';
import {RatingRepository, SupplierRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

export class SupplierController {
    constructor(
        @repository(SupplierRepository)
        public supplierRepository: SupplierRepository,
        @repository(RatingRepository)
        public ratingRepository: RatingRepository,
    ) {
    }

      @authenticate('jwt')
  @post('/suppliers', {
        responses: {
            '200': {
                description: 'Supplier model instance',
                content: {'application/json': {schema: getModelSchemaRef(Supplier)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Supplier, {
                        title: 'NewSupplier',
                        exclude: ['id'],
                    }),
                },
            },
        })
            supplier: Omit<Supplier, 'id'>,
    ): Promise<Supplier> {
        const count = await this.supplierRepository.count();
        let number = 1000 + count.count + 1;
        supplier.number = 'LI' + number;
        return this.supplierRepository.create(supplier);
    }

      @authenticate('jwt')
  @get('/suppliers/count', {
        responses: {
            '200': {
                description: 'Supplier model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Supplier)) where?: Where<Supplier>,
    ): Promise<Count> {
        return this.supplierRepository.count(where);
    }

      @authenticate('jwt')
  @get('/suppliers', {
        responses: {
            '200': {
                description: 'Array of Supplier model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Supplier)},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Supplier)) filter?: Filter<Supplier>,
    ): Promise<Supplier[]> {
        const include = {
            include: [
                {relation: 'ratings'}
            ]
        };
        if (filter) {
            Object.assign(filter, include);
        } else {
            filter = include;
        }
        return this.supplierRepository.find(filter);
    }

      @authenticate('jwt')
  @patch('/suppliers', {
        responses: {
            '200': {
                description: 'Supplier PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Supplier, {partial: true}),
                },
            },
        })
            supplier: Supplier,
        @param.query.object('where', getWhereSchemaFor(Supplier)) where?: Where<Supplier>,
    ): Promise<Count> {
        return this.supplierRepository.updateAll(supplier, where);
    }

      @authenticate('jwt')
  @get('/suppliers/{id}', {
        responses: {
            '200': {
                description: 'Supplier model instance',
                content: {'application/json': {schema: getModelSchemaRef(Supplier)}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<Supplier> {
        return this.supplierRepository.findById(id);
    }

      @authenticate('jwt')
  @patch('/suppliers/{id}', {
        responses: {
            '204': {
                description: 'Supplier PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Supplier, {partial: true}),
                },
            },
        })
            supplier: Supplier,
    ): Promise<void> {
        await this.supplierRepository.updateById(id, supplier);
    }

      @authenticate('jwt')
  @put('/suppliers/{id}', {
        responses: {
            '204': {
                description: 'Supplier PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() supplier: Supplier,
    ): Promise<void> {
        await this.supplierRepository.replaceById(id, supplier);
    }

      @authenticate('jwt')
  @del('/suppliers/{id}', {
        responses: {
            '204': {
                description: 'Supplier DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.supplierRepository.deleteById(id);
    }

      @authenticate('jwt')
  @post('/suppliers/{id}/rating', {
        responses: {
            '200': {
                description: 'Supplier model instance',
                content: {'application/json': {schema: getModelSchemaRef(Supplier)}},
            },
        },
    })
    async setRating(
        @param.path.string('id') id: string,
        @requestBody() data: { rating: Rating }
    ) {
        let rating: Rating = data.rating;
        return await this.supplierRepository.ratings(id).create(rating);
    }
}
