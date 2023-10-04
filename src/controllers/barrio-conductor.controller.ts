import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Barrio,
  Conductor,
} from '../models';
import {BarrioRepository} from '../repositories';

export class BarrioConductorController {
  constructor(
    @repository(BarrioRepository) protected barrioRepository: BarrioRepository,
  ) { }

  @get('/barrios/{id}/conductor', {
    responses: {
      '200': {
        description: 'Barrio has one Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Conductor>,
  ): Promise<Conductor> {
    return this.barrioRepository.conductor(id).get(filter);
  }

  @post('/barrios/{id}/conductor', {
    responses: {
      '200': {
        description: 'Barrio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Barrio.prototype.idBarrio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductorInBarrio',
            exclude: ['idConductor'],
            optional: ['barrioId']
          }),
        },
      },
    }) conductor: Omit<Conductor, 'idConductor'>,
  ): Promise<Conductor> {
    return this.barrioRepository.conductor(id).create(conductor);
  }

  @patch('/barrios/{id}/conductor', {
    responses: {
      '200': {
        description: 'Barrio.Conductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Partial<Conductor>,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.barrioRepository.conductor(id).patch(conductor, where);
  }

  @del('/barrios/{id}/conductor', {
    responses: {
      '200': {
        description: 'Barrio.Conductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.barrioRepository.conductor(id).delete(where);
  }
}
