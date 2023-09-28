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
  Recorrido,
  Viaje,
} from '../models';
import {RecorridoRepository} from '../repositories';

export class RecorridoViajeController {
  constructor(
    @repository(RecorridoRepository) protected recorridoRepository: RecorridoRepository,
  ) { }

  @get('/recorridos/{id}/viajes', {
    responses: {
      '200': {
        description: 'Array of Recorrido has many Viaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Viaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Viaje>,
  ): Promise<Viaje[]> {
    return this.recorridoRepository.viajes(id).find(filter);
  }

  @post('/recorridos/{id}/viajes', {
    responses: {
      '200': {
        description: 'Recorrido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Recorrido.prototype.idRecorrido,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            title: 'NewViajeInRecorrido',
            exclude: ['idViaje'],
            optional: ['recorridoId']
          }),
        },
      },
    }) viaje: Omit<Viaje, 'idViaje'>,
  ): Promise<Viaje> {
    return this.recorridoRepository.viajes(id).create(viaje);
  }

  @patch('/recorridos/{id}/viajes', {
    responses: {
      '200': {
        description: 'Recorrido.Viaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {partial: true}),
        },
      },
    })
    viaje: Partial<Viaje>,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.recorridoRepository.viajes(id).patch(viaje, where);
  }

  @del('/recorridos/{id}/viajes', {
    responses: {
      '200': {
        description: 'Recorrido.Viaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.recorridoRepository.viajes(id).delete(where);
  }
}
