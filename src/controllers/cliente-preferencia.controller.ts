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
  Preferencia,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePreferenciaController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/preferencias', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Preferencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Preferencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Preferencia>,
  ): Promise<Preferencia[]> {
    return this.clienteRepository.preferencias(id).find(filter);
  }

  @post('/clientes/{id}/preferencias', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Preferencia)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.idCliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferencia, {
            title: 'NewPreferenciaInCliente',
            exclude: ['idPreferencia'],
            optional: ['clienteId']
          }),
        },
      },
    }) preferencia: Omit<Preferencia, 'idPreferencia'>,
  ): Promise<Preferencia> {
    return this.clienteRepository.preferencias(id).create(preferencia);
  }

  @patch('/clientes/{id}/preferencias', {
    responses: {
      '200': {
        description: 'Cliente.Preferencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferencia, {partial: true}),
        },
      },
    })
    preferencia: Partial<Preferencia>,
    @param.query.object('where', getWhereSchemaFor(Preferencia)) where?: Where<Preferencia>,
  ): Promise<Count> {
    return this.clienteRepository.preferencias(id).patch(preferencia, where);
  }

  @del('/clientes/{id}/preferencias', {
    responses: {
      '200': {
        description: 'Cliente.Preferencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Preferencia)) where?: Where<Preferencia>,
  ): Promise<Count> {
    return this.clienteRepository.preferencias(id).delete(where);
  }
}
