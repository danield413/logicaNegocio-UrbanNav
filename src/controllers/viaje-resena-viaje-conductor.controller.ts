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
  Viaje,
  ResenaViajeConductor,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeResenaViajeConductorController {
  constructor(
    @repository(ViajeRepository) protected viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/resena-viaje-conductor', {
    responses: {
      '200': {
        description: 'Viaje has one ResenaViajeConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResenaViajeConductor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ResenaViajeConductor>,
  ): Promise<ResenaViajeConductor> {
    return this.viajeRepository.resenaViajeConductor(id).get(filter);
  }

  @post('/viajes/{id}/resena-viaje-conductor', {
    responses: {
      '200': {
        description: 'Viaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResenaViajeConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Viaje.prototype.idViaje,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeConductor, {
            title: 'NewResenaViajeConductorInViaje',
            exclude: ['idResena'],
            optional: ['viajeId']
          }),
        },
      },
    }) resenaViajeConductor: Omit<ResenaViajeConductor, 'idResena'>,
  ): Promise<ResenaViajeConductor> {
    return this.viajeRepository.resenaViajeConductor(id).create(resenaViajeConductor);
  }

  @patch('/viajes/{id}/resena-viaje-conductor', {
    responses: {
      '200': {
        description: 'Viaje.ResenaViajeConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeConductor, {partial: true}),
        },
      },
    })
    resenaViajeConductor: Partial<ResenaViajeConductor>,
    @param.query.object('where', getWhereSchemaFor(ResenaViajeConductor)) where?: Where<ResenaViajeConductor>,
  ): Promise<Count> {
    return this.viajeRepository.resenaViajeConductor(id).patch(resenaViajeConductor, where);
  }

  @del('/viajes/{id}/resena-viaje-conductor', {
    responses: {
      '200': {
        description: 'Viaje.ResenaViajeConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ResenaViajeConductor)) where?: Where<ResenaViajeConductor>,
  ): Promise<Count> {
    return this.viajeRepository.resenaViajeConductor(id).delete(where);
  }
}
