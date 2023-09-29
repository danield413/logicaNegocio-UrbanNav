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
  Administrador,
  JustificacionCliente,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorJustificacionClienteController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Array of Administrador has many JustificacionCliente',
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
    return this.administradorRepository.justificacionClientes(id).find(filter);
  }

  @post('/administradors/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(JustificacionCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Administrador.prototype.idAdministrador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionCliente, {
            title: 'NewJustificacionClienteInAdministrador',
            exclude: ['idJustificacion'],
            optional: ['administradorId']
          }),
        },
      },
    }) justificacionCliente: Omit<JustificacionCliente, 'idJustificacion'>,
  ): Promise<JustificacionCliente> {
    return this.administradorRepository.justificacionClientes(id).create(justificacionCliente);
  }

  @patch('/administradors/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Administrador.JustificacionCliente PATCH success count',
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
    return this.administradorRepository.justificacionClientes(id).patch(justificacionCliente, where);
  }

  @del('/administradors/{id}/justificacion-clientes', {
    responses: {
      '200': {
        description: 'Administrador.JustificacionCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(JustificacionCliente)) where?: Where<JustificacionCliente>,
  ): Promise<Count> {
    return this.administradorRepository.justificacionClientes(id).delete(where);
  }
}
