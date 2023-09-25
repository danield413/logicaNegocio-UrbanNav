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
  Alerta,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeAlertaController {
  constructor(
    @repository(ViajeRepository) protected viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/alerta', {
    responses: {
      '200': {
        description: 'Viaje has one Alerta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Alerta),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Alerta>,
  ): Promise<Alerta> {
    return this.viajeRepository.alerta(id).get(filter);
  }

  @post('/viajes/{id}/alerta', {
    responses: {
      '200': {
        description: 'Viaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alerta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Viaje.prototype.idViaje,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerta, {
            title: 'NewAlertaInViaje',
            exclude: ['idAlerta'],
            optional: ['viajeId']
          }),
        },
      },
    }) alerta: Omit<Alerta, 'idAlerta'>,
  ): Promise<Alerta> {
    return this.viajeRepository.alerta(id).create(alerta);
  }

  @patch('/viajes/{id}/alerta', {
    responses: {
      '200': {
        description: 'Viaje.Alerta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerta, {partial: true}),
        },
      },
    })
    alerta: Partial<Alerta>,
    @param.query.object('where', getWhereSchemaFor(Alerta)) where?: Where<Alerta>,
  ): Promise<Count> {
    return this.viajeRepository.alerta(id).patch(alerta, where);
  }

  @del('/viajes/{id}/alerta', {
    responses: {
      '200': {
        description: 'Viaje.Alerta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Alerta)) where?: Where<Alerta>,
  ): Promise<Count> {
    return this.viajeRepository.alerta(id).delete(where);
  }
}
