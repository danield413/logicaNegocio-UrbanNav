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
import {Barrio, Recorrido} from '../models';
import {BarrioRepository} from '../repositories';

export class BarrioRecorridoController {
  constructor(
    @repository(BarrioRepository) protected barrioRepository: BarrioRepository,
  ) {}

  @get('/barrios/{id}/recorridos', {
    responses: {
      '200': {
        description: 'Array of Barrio has many Recorrido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recorrido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Recorrido>,
  ): Promise<Recorrido[]> {
    return this.barrioRepository.recorridosOrigen(id).find(filter);
  }

  @post('/barrios/{id}/recorridos', {
    responses: {
      '200': {
        description: 'Barrio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recorrido)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Barrio.prototype.idBarrio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {
            title: 'NewRecorridoInBarrio',
            exclude: ['idRecorrido'],
            optional: ['barrioOrigenId'],
          }),
        },
      },
    })
    recorrido: Omit<Recorrido, 'idRecorrido'>,
  ): Promise<Recorrido> {
    return this.barrioRepository.recorridosOrigen(id).create(recorrido);
  }

  @patch('/barrios/{id}/recorridos', {
    responses: {
      '200': {
        description: 'Barrio.Recorrido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {partial: true}),
        },
      },
    })
    recorrido: Partial<Recorrido>,
    @param.query.object('where', getWhereSchemaFor(Recorrido))
    where?: Where<Recorrido>,
  ): Promise<Count> {
    return this.barrioRepository.recorridosOrigen(id).patch(recorrido, where);
  }

  @del('/barrios/{id}/recorridos', {
    responses: {
      '200': {
        description: 'Barrio.Recorrido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Recorrido))
    where?: Where<Recorrido>,
  ): Promise<Count> {
    return this.barrioRepository.recorridosOrigen(id).delete(where);
  }

  //create the same for recorridosDestino

  @get('/barrios/{id}/recorridosDestino', {
    responses: {
      '200': {
        description: 'Array of Barrio has many Recorrido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recorrido)},
          },
        },
      },
    },
  })
  async findDestino(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Recorrido>,
  ): Promise<Recorrido[]> {
    return this.barrioRepository.recorridosDestino(id).find(filter);
  }

  @post('/barrios/{id}/recorridosDestino', {
    responses: {
      '200': {
        description: 'Barrio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recorrido)}},
      },
    },
  })
  async createDestino(
    @param.path.number('id') id: typeof Barrio.prototype.idBarrio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {
            title: 'NewRecorridoInBarrio',
            exclude: ['idRecorrido'],
            optional: ['barrioDestinoId'],
          }),
        },
      },
    })
    recorrido: Omit<Recorrido, 'idRecorrido'>,
  ): Promise<Recorrido> {
    return this.barrioRepository.recorridosDestino(id).create(recorrido);
  }

  @patch('/barrios/{id}/recorridosDestino', {
    responses: {
      '200': {
        description: 'Barrio.Recorrido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchDestino(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {partial: true}),
        },
      },
    })
    recorrido: Partial<Recorrido>,
    @param.query.object('where', getWhereSchemaFor(Recorrido))
    where?: Where<Recorrido>,
  ): Promise<Count> {
    return this.barrioRepository.recorridosDestino(id).patch(recorrido, where);
  }

  @del('/barrios/{id}/recorridosDestino', {
    responses: {
      '200': {
        description: 'Barrio.Recorrido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteDestino(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Recorrido))
    where?: Where<Recorrido>,
  ): Promise<Count> {
    return this.barrioRepository.recorridosDestino(id).delete(where);
  }
}
