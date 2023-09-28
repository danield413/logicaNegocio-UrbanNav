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
  Cliente,
  JustificacionCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteJustificacionClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many JustificacionCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(JustificacionCliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<JustificacionCliente>,
  ): Promise<JustificacionCliente[]> {
    return this.clienteRepository.justificacionClientes(id).find(filter);
  }

  @post('/clientes/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(JustificacionCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.idCliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionCliente, {
            title: 'NewJustificacionClienteInCliente',
            exclude: ['idJustificacion'],
            optional: ['clienteId']
          }),
        },
      },
    }) justificacionCliente: Omit<JustificacionCliente, 'idJustificacion'>,
  ): Promise<JustificacionCliente> {
    return this.clienteRepository.justificacionClientes(id).create(justificacionCliente);
  }

  @patch('/clientes/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Cliente.JustificacionCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionCliente, {partial: true}),
        },
      },
    })
    justificacionCliente: Partial<JustificacionCliente>,
    @param.query.object('where', getWhereSchemaFor(JustificacionCliente)) where?: Where<JustificacionCliente>,
  ): Promise<Count> {
    return this.clienteRepository.justificacionClientes(id).patch(justificacionCliente, where);
  }

  @del('/clientes/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Cliente.JustificacionCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(JustificacionCliente)) where?: Where<JustificacionCliente>,
  ): Promise<Count> {
    return this.clienteRepository.justificacionClientes(id).delete(where);
  }
}
