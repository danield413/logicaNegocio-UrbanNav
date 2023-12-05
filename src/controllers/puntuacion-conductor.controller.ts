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
import {PuntuacionConductor} from '../models';
import {PuntuacionConductorRepository} from '../repositories';

export class PuntuacionConductorController {
  constructor(
    @repository(PuntuacionConductorRepository)
    public puntuacionConductorRepository: PuntuacionConductorRepository,
  ) { }

  @post('/puntuacion-conductor')
  @response(200, {
    description: 'PuntuacionConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(PuntuacionConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionConductor, {
            title: 'NewPuntuacionConductor',
            exclude: ['idPuntuacion'],
          }),
        },
      },
    })
    puntuacionConductor: Omit<PuntuacionConductor, 'idPuntuacion'>,
  ): Promise<PuntuacionConductor> {
    return this.puntuacionConductorRepository.create(puntuacionConductor);
  }

  @get('/puntuacion-conductor/count')
  @response(200, {
    description: 'PuntuacionConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PuntuacionConductor) where?: Where<PuntuacionConductor>,
  ): Promise<Count> {
    return this.puntuacionConductorRepository.count(where);
  }

  @get('/puntuacion-conductor')
  @response(200, {
    description: 'Array of PuntuacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PuntuacionConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PuntuacionConductor) filter?: Filter<PuntuacionConductor>,
  ): Promise<PuntuacionConductor[]> {
    return this.puntuacionConductorRepository.find(filter);
  }

  @patch('/puntuacion-conductor')
  @response(200, {
    description: 'PuntuacionConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionConductor, {partial: true}),
        },
      },
    })
    puntuacionConductor: PuntuacionConductor,
    @param.where(PuntuacionConductor) where?: Where<PuntuacionConductor>,
  ): Promise<Count> {
    return this.puntuacionConductorRepository.updateAll(puntuacionConductor, where);
  }

  @get('/puntuacion-conductor/{id}')
  @response(200, {
    description: 'PuntuacionConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PuntuacionConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PuntuacionConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<PuntuacionConductor>
  ): Promise<PuntuacionConductor> {
    return this.puntuacionConductorRepository.findById(id, filter);
  }

  @patch('/puntuacion-conductor/{id}')
  @response(204, {
    description: 'PuntuacionConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionConductor, {partial: true}),
        },
      },
    })
    puntuacionConductor: PuntuacionConductor,
  ): Promise<void> {
    await this.puntuacionConductorRepository.updateById(id, puntuacionConductor);
  }

  @put('/puntuacion-conductor/{id}')
  @response(204, {
    description: 'PuntuacionConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() puntuacionConductor: PuntuacionConductor,
  ): Promise<void> {
    await this.puntuacionConductorRepository.replaceById(id, puntuacionConductor);
  }

  @del('/puntuacion-conductor/{id}')
  @response(204, {
    description: 'PuntuacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.puntuacionConductorRepository.deleteById(id);
  }
}
