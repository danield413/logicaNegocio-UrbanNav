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
import {PuntuacionCliente} from '../models';
import {PuntuacionClienteRepository} from '../repositories';

export class PuntuacionClienteController {
  constructor(
    @repository(PuntuacionClienteRepository)
    public puntuacionClienteRepository : PuntuacionClienteRepository,
  ) {}

  @post('/puntuacion-cliente')
  @response(200, {
    description: 'PuntuacionCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(PuntuacionCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionCliente, {
            title: 'NewPuntuacionCliente',
            exclude: ['idPuntuacion'],
          }),
        },
      },
    })
    puntuacionCliente: Omit<PuntuacionCliente, 'idPuntuacion'>,
  ): Promise<PuntuacionCliente> {
    return this.puntuacionClienteRepository.create(puntuacionCliente);
  }

  @get('/puntuacion-cliente/count')
  @response(200, {
    description: 'PuntuacionCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PuntuacionCliente) where?: Where<PuntuacionCliente>,
  ): Promise<Count> {
    return this.puntuacionClienteRepository.count(where);
  }

  @get('/puntuacion-cliente')
  @response(200, {
    description: 'Array of PuntuacionCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PuntuacionCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PuntuacionCliente) filter?: Filter<PuntuacionCliente>,
  ): Promise<PuntuacionCliente[]> {
    return this.puntuacionClienteRepository.find(filter);
  }

  @patch('/puntuacion-cliente')
  @response(200, {
    description: 'PuntuacionCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionCliente, {partial: true}),
        },
      },
    })
    puntuacionCliente: PuntuacionCliente,
    @param.where(PuntuacionCliente) where?: Where<PuntuacionCliente>,
  ): Promise<Count> {
    return this.puntuacionClienteRepository.updateAll(puntuacionCliente, where);
  }

  @get('/puntuacion-cliente/{id}')
  @response(200, {
    description: 'PuntuacionCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PuntuacionCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PuntuacionCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<PuntuacionCliente>
  ): Promise<PuntuacionCliente> {
    return this.puntuacionClienteRepository.findById(id, filter);
  }

  @patch('/puntuacion-cliente/{id}')
  @response(204, {
    description: 'PuntuacionCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionCliente, {partial: true}),
        },
      },
    })
    puntuacionCliente: PuntuacionCliente,
  ): Promise<void> {
    await this.puntuacionClienteRepository.updateById(id, puntuacionCliente);
  }

  @put('/puntuacion-cliente/{id}')
  @response(204, {
    description: 'PuntuacionCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() puntuacionCliente: PuntuacionCliente,
  ): Promise<void> {
    await this.puntuacionClienteRepository.replaceById(id, puntuacionCliente);
  }

  @del('/puntuacion-cliente/{id}')
  @response(204, {
    description: 'PuntuacionCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.puntuacionClienteRepository.deleteById(id);
  }
}
