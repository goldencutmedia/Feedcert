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
import {Rating} from '../models';
import {RatingRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

export class RatingController {
    constructor(
        @repository(RatingRepository)
        public ratingRepository: RatingRepository,
    ) {
    }

    @authenticate('jwt')
    @post('/ratings', {
        responses: {
            '200': {
                description: 'Rating model instance',
                content: {'application/json': {schema: getModelSchemaRef(Rating)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Rating, {
                        title: 'NewRating',
                        exclude: ['id'],
                    }),
                },
            },
        })
            rating: Omit<Rating, 'id'>,
    ): Promise<Rating> {
        const count = await this.ratingRepository.count();
        let number = count.count + 1;
        rating.position = '' + number;

        return this.ratingRepository.create(rating);
    }

    @authenticate('jwt')
    @get('/ratings/count', {
        responses: {
            '200': {
                description: 'Rating model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
    ): Promise<Count> {
        return this.ratingRepository.count(where);
    }

    @authenticate('jwt')
    @get('/ratings', {
        responses: {
            '200': {
                description: 'Array of Rating model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Rating)},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Rating)) filter?: Filter<Rating>,
    ): Promise<Rating[]> {
        return this.ratingRepository.find(filter);
    }

    @authenticate('jwt')
    @patch('/ratings', {
        responses: {
            '200': {
                description: 'Rating PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Rating, {partial: true}),
                },
            },
        })
            rating: Rating,
        @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
    ): Promise<Count> {
        return this.ratingRepository.updateAll(rating, where);
    }

    @authenticate('jwt')
    @get('/ratings/{id}', {
        responses: {
            '200': {
                description: 'Rating model instance',
                content: {'application/json': {schema: getModelSchemaRef(Rating)}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<Rating> {
        return this.ratingRepository.findById(id);
    }

    @authenticate('jwt')
    @patch('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Rating, {partial: true}),
                },
            },
        })
            rating: Rating,
    ): Promise<void> {
        await this.ratingRepository.updateById(id, rating);
    }

    @authenticate('jwt')
    @put('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() rating: Rating,
    ): Promise<void> {
        await this.ratingRepository.replaceById(id, rating);
    }

    @authenticate('jwt')
    @del('/ratings/{id}', {
        responses: {
            '204': {
                description: 'Rating DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.ratingRepository.deleteById(id);
    }
}
