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
  ResenaViajeCliente,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeResenaViajeClienteController {
  constructor(
    @repository(ViajeRepository) protected viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/resena-viaje-cliente', {
    responses: {
      '200': {
        description: 'Viaje has one ResenaViajeCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResenaViajeCliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ResenaViajeCliente>,
  ): Promise<ResenaViajeCliente> {
    return this.viajeRepository.resenaViajeCliente(id).get(filter);
  }

  @post('/viajes/{id}/resena-viaje-cliente', {
    responses: {
      '200': {
        description: 'Viaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResenaViajeCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Viaje.prototype.idViaje,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeCliente, {
            title: 'NewResenaViajeClienteInViaje',
            exclude: ['idResena'],
            optional: ['viajeId']
          }),
        },
      },
    }) resenaViajeCliente: Omit<ResenaViajeCliente, 'idResena'>,
  ): Promise<ResenaViajeCliente> {
    return this.viajeRepository.resenaViajeCliente(id).create(resenaViajeCliente);
  }

  @patch('/viajes/{id}/resena-viaje-cliente', {
    responses: {
      '200': {
        description: 'Viaje.ResenaViajeCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeCliente, {partial: true}),
        },
      },
    })
    resenaViajeCliente: Partial<ResenaViajeCliente>,
    @param.query.object('where', getWhereSchemaFor(ResenaViajeCliente)) where?: Where<ResenaViajeCliente>,
  ): Promise<Count> {
    return this.viajeRepository.resenaViajeCliente(id).patch(resenaViajeCliente, where);
  }

  @del('/viajes/{id}/resena-viaje-cliente', {
    responses: {
      '200': {
        description: 'Viaje.ResenaViajeCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ResenaViajeCliente)) where?: Where<ResenaViajeCliente>,
  ): Promise<Count> {
    return this.viajeRepository.resenaViajeCliente(id).delete(where);
  }
}
