import {service} from '@loopback/core';
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
import {Recorrido, RecorridoSolicitud} from '../models';
import {RecorridoRepository} from '../repositories';
import {LogicaServicioService} from '../services';
import {ConfiguracionLogica} from '../config/logica.config';

export class RecorridoController {
  constructor(
    @repository(RecorridoRepository)
    public recorridoRepository: RecorridoRepository,
    @service(LogicaServicioService)
    public servicioLogica: LogicaServicioService,
  ) { }

  @post('/recorrido')
  @response(200, {
    description: 'Recorrido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recorrido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {
            title: 'NewRecorrido',
            exclude: ['idRecorrido'],
          }),
        },
      },
    })
    recorrido: Omit<Recorrido, 'idRecorrido'>,
  ): Promise<Recorrido> {
    return this.recorridoRepository.create(recorrido);
  }

  @get('/recorrido/count')
  @response(200, {
    description: 'Recorrido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recorrido) where?: Where<Recorrido>,
  ): Promise<Count> {
    return this.recorridoRepository.count(where);
  }

  @get('/recorrido')
  @response(200, {
    description: 'Array of Recorrido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recorrido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recorrido) filter?: Filter<Recorrido>,
  ): Promise<Recorrido[]> {
    return this.recorridoRepository.find(filter);
  }

  @patch('/recorrido')
  @response(200, {
    description: 'Recorrido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {partial: true}),
        },
      },
    })
    recorrido: Recorrido,
    @param.where(Recorrido) where?: Where<Recorrido>,
  ): Promise<Count> {
    return this.recorridoRepository.updateAll(recorrido, where);
  }

  @get('/recorrido/{id}')
  @response(200, {
    description: 'Recorrido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recorrido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recorrido, {exclude: 'where'}) filter?: FilterExcludingWhere<Recorrido>
  ): Promise<Recorrido> {
    return this.recorridoRepository.findById(id, filter);
  }

  @get('/precio-recorrido/{id}')
  @response(200, {
    description: 'Recorrido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recorrido, {includeRelations: true}),
      },
    },
  })
  async buscarPrecioRecorrido(
    @param.path.number('id') id: number,
    @param.filter(Recorrido, {exclude: 'where'}) filter?: FilterExcludingWhere<Recorrido>
  ): Promise<any> {
     return await this.servicioLogica.calcularPrecioRecorrido(id);
  }

  @patch('/recorrido/{id}')
  @response(204, {
    description: 'Recorrido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorrido, {partial: true}),
        },
      },
    })
    recorrido: Recorrido,
  ): Promise<void> {
    await this.recorridoRepository.updateById(id, recorrido);
  }

  @put('/recorrido/{id}')
  @response(204, {
    description: 'Recorrido PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recorrido: Recorrido,
  ): Promise<void> {
    await this.recorridoRepository.replaceById(id, recorrido);
  }

  @del('/recorrido/{id}')
  @response(204, {
    description: 'Recorrido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recorridoRepository.deleteById(id);
  }

  //solicitar viaje
  @post('/recorrido/solicitar')
  @response(200, {
    description: 'Recorrido model instance',
    content: {'application/json': {schema: getModelSchemaRef(RecorridoSolicitud)}},
  })
  async solicitar(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecorridoSolicitud),
        },
      },
    })
    recorridoSolicitud: RecorridoSolicitud
  ): Promise<any> {
    return await this.servicioLogica.buscarConductorMasCercano(recorridoSolicitud);
  }
}
