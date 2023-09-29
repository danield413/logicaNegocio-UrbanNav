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
  ResenaViajeCliente,
  PuntuacionCliente,
} from '../models';
import {ResenaViajeClienteRepository} from '../repositories';

export class ResenaViajeClientePuntuacionClienteController {
  constructor(
    @repository(ResenaViajeClienteRepository) protected resenaViajeClienteRepository: ResenaViajeClienteRepository,
  ) { }

  @get('/resena-viaje-clientes/{id}/puntuacion-cliente', {
    responses: {
      '200': {
        description: 'ResenaViajeCliente has one PuntuacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PuntuacionCliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PuntuacionCliente>,
  ): Promise<PuntuacionCliente> {
    return this.resenaViajeClienteRepository.puntuacionCliente(id).get(filter);
  }

  @post('/resena-viaje-clientes/{id}/puntuacion-cliente', {
    responses: {
      '200': {
        description: 'ResenaViajeCliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(PuntuacionCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ResenaViajeCliente.prototype.idResena,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionCliente, {
            title: 'NewPuntuacionClienteInResenaViajeCliente',
            exclude: ['idPuntuacion'],
            optional: ['resenaViajeClienteId']
          }),
        },
      },
    }) puntuacionCliente: Omit<PuntuacionCliente, 'idPuntuacion'>,
  ): Promise<PuntuacionCliente> {
    return this.resenaViajeClienteRepository.puntuacionCliente(id).create(puntuacionCliente);
  }

  @patch('/resena-viaje-clientes/{id}/puntuacion-cliente', {
    responses: {
      '200': {
        description: 'ResenaViajeCliente.PuntuacionCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionCliente, {partial: true}),
        },
      },
    })
    puntuacionCliente: Partial<PuntuacionCliente>,
    @param.query.object('where', getWhereSchemaFor(PuntuacionCliente)) where?: Where<PuntuacionCliente>,
  ): Promise<Count> {
    return this.resenaViajeClienteRepository.puntuacionCliente(id).patch(puntuacionCliente, where);
  }

  @del('/resena-viaje-clientes/{id}/puntuacion-cliente', {
    responses: {
      '200': {
        description: 'ResenaViajeCliente.PuntuacionCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PuntuacionCliente)) where?: Where<PuntuacionCliente>,
  ): Promise<Count> {
    return this.resenaViajeClienteRepository.puntuacionCliente(id).delete(where);
  }
}
