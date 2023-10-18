import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {JustificacionCliente} from '../models';
import {JustificacionClienteRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

export class JustificacionClienteController {
  constructor(
    @repository(JustificacionClienteRepository)
    public justificacionClienteRepository : JustificacionClienteRepository,
  ) {}

  @authenticate({
    strategy: 'admin',
  })
  @post('/justificacion-cliente')
  @response(200, {
    description: 'JustificacionCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(JustificacionCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionCliente, {
            title: 'NewJustificacionCliente',
            exclude: ['idJustificacion'],
          }),
        },
      },
    })
    justificacionCliente: Omit<JustificacionCliente, 'idJustificacion'>,
  ): Promise<JustificacionCliente> {
    return this.justificacionClienteRepository.create(justificacionCliente);
  }

  @authenticate({
    strategy: 'admin',
  })
  @get('/justificacion-cliente/count')
  @response(200, {
    description: 'JustificacionCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JustificacionCliente) where?: Where<JustificacionCliente>,
  ): Promise<Count> {
    return this.justificacionClienteRepository.count(where);
  }

  @authenticate({
    strategy: 'admin',
  })
  @get('/justificacion-cliente')
  @response(200, {
    description: 'Array of JustificacionCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JustificacionCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JustificacionCliente) filter?: Filter<JustificacionCliente>,
  ): Promise<JustificacionCliente[]> {
    return this.justificacionClienteRepository.find(filter);
  }

  @authenticate({
    strategy: 'admin',
  })
  @patch('/justificacion-cliente')
  @response(200, {
    description: 'JustificacionCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionCliente, {partial: true}),
        },
      },
    })
    justificacionCliente: JustificacionCliente,
    @param.where(JustificacionCliente) where?: Where<JustificacionCliente>,
  ): Promise<Count> {
    return this.justificacionClienteRepository.updateAll(justificacionCliente, where);
  }

  @authenticate({
    strategy: 'admin',
  })
  @get('/justificacion-cliente/{id}')
  @response(200, {
    description: 'JustificacionCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JustificacionCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JustificacionCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<JustificacionCliente>
  ): Promise<JustificacionCliente> {
    return this.justificacionClienteRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'admin',
  })
  @patch('/justificacion-cliente/{id}')
  @response(204, {
    description: 'JustificacionCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionCliente, {partial: true}),
        },
      },
    })
    justificacionCliente: JustificacionCliente,
  ): Promise<void> {
    await this.justificacionClienteRepository.updateById(id, justificacionCliente);
  }

  @authenticate({
    strategy: 'admin',
  })
  @put('/justificacion-cliente/{id}')
  @response(204, {
    description: 'JustificacionCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() justificacionCliente: JustificacionCliente,
  ): Promise<void> {
    await this.justificacionClienteRepository.replaceById(id, justificacionCliente);
  }

  @authenticate({
    strategy: 'admin',
  })
  @del('/justificacion-cliente/{id}')
  @response(204, {
    description: 'JustificacionCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.justificacionClienteRepository.deleteById(id);
  }
}
