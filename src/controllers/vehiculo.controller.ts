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
import {Vehiculo} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository : VehiculoRepository,
  ) {}

  @post('/vehiculo')
  @response(200, {
    description: 'Vehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculo',
            exclude: ['idVehiculo'],
          }),
        },
      },
    })
    vehiculo: Omit<Vehiculo, 'idVehiculo'>,
  ): Promise<Vehiculo> {
    return this.vehiculoRepository.create(vehiculo);
  }

  @get('/vehiculo/count')
  @response(200, {
    description: 'Vehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vehiculo) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.count(where);
  }

  @get('/vehiculo')
  @response(200, {
    description: 'Array of Vehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vehiculo) filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find(filter);
  }

  @patch('/vehiculo')
  @response(200, {
    description: 'Vehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Vehiculo,
    @param.where(Vehiculo) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.updateAll(vehiculo, where);
  }

  @get('/vehiculo/{id}')
  @response(200, {
    description: 'Vehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<Vehiculo>
  ): Promise<Vehiculo> {
    return this.vehiculoRepository.findById(id, filter);
  }

  @patch('/vehiculo/{id}')
  @response(204, {
    description: 'Vehiculo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Vehiculo,
  ): Promise<void> {
    await this.vehiculoRepository.updateById(id, vehiculo);
  }

  @put('/vehiculo/{id}')
  @response(204, {
    description: 'Vehiculo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vehiculo: Vehiculo,
  ): Promise<void> {
    await this.vehiculoRepository.replaceById(id, vehiculo);
  }

  @del('/vehiculo/{id}')
  @response(204, {
    description: 'Vehiculo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vehiculoRepository.deleteById(id);
  }
}
