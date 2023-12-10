import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Preferencia} from '../models';
import {PreferenciaRepository} from '../repositories';

export class PreferenciaController {
  constructor(
    @repository(PreferenciaRepository)
    public preferenciaRepository: PreferenciaRepository,
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

  @authenticate({
    strategy: 'cliente',
  })
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

  @authenticate({
    strategy: 'cliente',
  })
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

  @authenticate({
    strategy: 'cliente',
  })
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

  @authenticate({
    strategy: 'cliente',
  })
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
    @param.filter(Preferencia, {exclude: 'where'})
    filter?: FilterExcludingWhere<Preferencia>,
  ): Promise<Preferencia> {
    return this.preferenciaRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'cliente',
  })
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

  @authenticate({
    strategy: 'cliente',
  })
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

  @authenticate({
    strategy: 'cliente',
  })
  @del('/preferencia/{id}')
  @response(204, {
    description: 'Preferencia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preferenciaRepository.deleteById(id);
  }
}
