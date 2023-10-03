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
import {Preferencia} from '../models';
import {PreferenciaRepository} from '../repositories';

export class PreferenciaController {
  constructor(
    @repository(PreferenciaRepository)
    public preferenciaRepository : PreferenciaRepository,
  ) {}

  @post('/preferencia')
  @response(200, {
    description: 'Preferencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Preferencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferencia, {
            title: 'NewPreferencia',
            exclude: ['idPreferencia'],
          }),
        },
      },
    })
    preferencia: Omit<Preferencia, 'idPreferencia'>,
  ): Promise<Preferencia> {
    return this.preferenciaRepository.create(preferencia);
  }

  @get('/preferencia/count')
  @response(200, {
    description: 'Preferencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Preferencia) where?: Where<Preferencia>,
  ): Promise<Count> {
    return this.preferenciaRepository.count(where);
  }

  @get('/preferencia')
  @response(200, {
    description: 'Array of Preferencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preferencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Preferencia) filter?: Filter<Preferencia>,
  ): Promise<Preferencia[]> {
    return this.preferenciaRepository.find(filter);
  }

  @patch('/preferencia')
  @response(200, {
    description: 'Preferencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferencia, {partial: true}),
        },
      },
    })
    preferencia: Preferencia,
    @param.where(Preferencia) where?: Where<Preferencia>,
  ): Promise<Count> {
    return this.preferenciaRepository.updateAll(preferencia, where);
  }

  @get('/preferencia/{id}')
  @response(200, {
    description: 'Preferencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Preferencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Preferencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Preferencia>
  ): Promise<Preferencia> {
    return this.preferenciaRepository.findById(id, filter);
  }

  @patch('/preferencia/{id}')
  @response(204, {
    description: 'Preferencia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferencia, {partial: true}),
        },
      },
    })
    preferencia: Preferencia,
  ): Promise<void> {
    await this.preferenciaRepository.updateById(id, preferencia);
  }

  @put('/preferencia/{id}')
  @response(204, {
    description: 'Preferencia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() preferencia: Preferencia,
  ): Promise<void> {
    await this.preferenciaRepository.replaceById(id, preferencia);
  }

  @del('/preferencia/{id}')
  @response(204, {
    description: 'Preferencia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preferenciaRepository.deleteById(id);
  }
}
