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
  Ciudad,
  Barrio,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadBarrioController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/barrios', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Barrio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Barrio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Barrio>,
  ): Promise<Barrio[]> {
    return this.ciudadRepository.barrios(id).find(filter);
  }

  @post('/ciudads/{id}/barrios', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Barrio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.idCiudad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Barrio, {
            title: 'NewBarrioInCiudad',
            exclude: ['idBarrio'],
            optional: ['ciudadId']
          }),
        },
      },
    }) barrio: Omit<Barrio, 'idBarrio'>,
  ): Promise<Barrio> {
    return this.ciudadRepository.barrios(id).create(barrio);
  }

  @patch('/ciudads/{id}/barrios', {
    responses: {
      '200': {
        description: 'Ciudad.Barrio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Barrio, {partial: true}),
        },
      },
    })
    barrio: Partial<Barrio>,
    @param.query.object('where', getWhereSchemaFor(Barrio)) where?: Where<Barrio>,
  ): Promise<Count> {
    return this.ciudadRepository.barrios(id).patch(barrio, where);
  }

  @del('/ciudads/{id}/barrios', {
    responses: {
      '200': {
        description: 'Ciudad.Barrio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Barrio)) where?: Where<Barrio>,
  ): Promise<Count> {
    return this.ciudadRepository.barrios(id).delete(where);
  }
}
