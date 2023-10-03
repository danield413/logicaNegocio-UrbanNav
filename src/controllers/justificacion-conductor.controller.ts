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
import {JustificacionConductor} from '../models';
import {JustificacionConductorRepository} from '../repositories';

export class JustificacionConductorController {
  constructor(
    @repository(JustificacionConductorRepository)
    public justificacionConductorRepository : JustificacionConductorRepository,
  ) {}

  @post('/justificacion-conductor')
  @response(200, {
    description: 'JustificacionConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(JustificacionConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionConductor, {
            title: 'NewJustificacionConductor',
            exclude: ['idJustificacion'],
          }),
        },
      },
    })
    justificacionConductor: Omit<JustificacionConductor, 'idJustificacion'>,
  ): Promise<JustificacionConductor> {
    return this.justificacionConductorRepository.create(justificacionConductor);
  }

  @get('/justificacion-conductor/count')
  @response(200, {
    description: 'JustificacionConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JustificacionConductor) where?: Where<JustificacionConductor>,
  ): Promise<Count> {
    return this.justificacionConductorRepository.count(where);
  }

  @get('/justificacion-conductor')
  @response(200, {
    description: 'Array of JustificacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JustificacionConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JustificacionConductor) filter?: Filter<JustificacionConductor>,
  ): Promise<JustificacionConductor[]> {
    return this.justificacionConductorRepository.find(filter);
  }

  @patch('/justificacion-conductor')
  @response(200, {
    description: 'JustificacionConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionConductor, {partial: true}),
        },
      },
    })
    justificacionConductor: JustificacionConductor,
    @param.where(JustificacionConductor) where?: Where<JustificacionConductor>,
  ): Promise<Count> {
    return this.justificacionConductorRepository.updateAll(justificacionConductor, where);
  }

  @get('/justificacion-conductor/{id}')
  @response(200, {
    description: 'JustificacionConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JustificacionConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JustificacionConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<JustificacionConductor>
  ): Promise<JustificacionConductor> {
    return this.justificacionConductorRepository.findById(id, filter);
  }

  @patch('/justificacion-conductor/{id}')
  @response(204, {
    description: 'JustificacionConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionConductor, {partial: true}),
        },
      },
    })
    justificacionConductor: JustificacionConductor,
  ): Promise<void> {
    await this.justificacionConductorRepository.updateById(id, justificacionConductor);
  }

  @put('/justificacion-conductor/{id}')
  @response(204, {
    description: 'JustificacionConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() justificacionConductor: JustificacionConductor,
  ): Promise<void> {
    await this.justificacionConductorRepository.replaceById(id, justificacionConductor);
  }

  @del('/justificacion-conductor/{id}')
  @response(204, {
    description: 'JustificacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.justificacionConductorRepository.deleteById(id);
  }
}
