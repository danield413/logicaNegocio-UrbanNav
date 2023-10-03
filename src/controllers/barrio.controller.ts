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
import {Barrio} from '../models';
import {BarrioRepository} from '../repositories';

export class BarrioController {
  constructor(
    @repository(BarrioRepository)
    public barrioRepository : BarrioRepository,
  ) {}

  @post('/barrio')
  @response(200, {
    description: 'Barrio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Barrio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Barrio, {
            title: 'NewBarrio',
            exclude: ['idBarrio'],
          }),
        },
      },
    })
    barrio: Omit<Barrio, 'idBarrio'>,
  ): Promise<Barrio> {
    return this.barrioRepository.create(barrio);
  }

  @get('/barrio/count')
  @response(200, {
    description: 'Barrio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Barrio) where?: Where<Barrio>,
  ): Promise<Count> {
    return this.barrioRepository.count(where);
  }

  @get('/barrio')
  @response(200, {
    description: 'Array of Barrio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Barrio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Barrio) filter?: Filter<Barrio>,
  ): Promise<Barrio[]> {
    return this.barrioRepository.find(filter);
  }

  @patch('/barrio')
  @response(200, {
    description: 'Barrio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Barrio, {partial: true}),
        },
      },
    })
    barrio: Barrio,
    @param.where(Barrio) where?: Where<Barrio>,
  ): Promise<Count> {
    return this.barrioRepository.updateAll(barrio, where);
  }

  @get('/barrio/{id}')
  @response(200, {
    description: 'Barrio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Barrio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Barrio, {exclude: 'where'}) filter?: FilterExcludingWhere<Barrio>
  ): Promise<Barrio> {
    return this.barrioRepository.findById(id, filter);
  }

  @patch('/barrio/{id}')
  @response(204, {
    description: 'Barrio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Barrio, {partial: true}),
        },
      },
    })
    barrio: Barrio,
  ): Promise<void> {
    await this.barrioRepository.updateById(id, barrio);
  }

  @put('/barrio/{id}')
  @response(204, {
    description: 'Barrio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() barrio: Barrio,
  ): Promise<void> {
    await this.barrioRepository.replaceById(id, barrio);
  }

  @del('/barrio/{id}')
  @response(204, {
    description: 'Barrio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.barrioRepository.deleteById(id);
  }
}
