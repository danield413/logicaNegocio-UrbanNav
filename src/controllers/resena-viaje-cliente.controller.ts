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
import {ResenaViajeCliente} from '../models';
import {ResenaViajeClienteRepository} from '../repositories';

export class ResenaViajeClienteController {
  constructor(
    @repository(ResenaViajeClienteRepository)
    public resenaViajeClienteRepository : ResenaViajeClienteRepository,
  ) {}

  @post('/resena-viaje-cliente')
  @response(200, {
    description: 'ResenaViajeCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResenaViajeCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeCliente, {
            title: 'NewResenaViajeCliente',
            exclude: ['idResena'],
          }),
        },
      },
    })
    resenaViajeCliente: Omit<ResenaViajeCliente, 'idResena'>,
  ): Promise<ResenaViajeCliente> {
    return this.resenaViajeClienteRepository.create(resenaViajeCliente);
  }

  @get('/resena-viaje-cliente/count')
  @response(200, {
    description: 'ResenaViajeCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResenaViajeCliente) where?: Where<ResenaViajeCliente>,
  ): Promise<Count> {
    return this.resenaViajeClienteRepository.count(where);
  }

  @get('/resena-viaje-cliente')
  @response(200, {
    description: 'Array of ResenaViajeCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResenaViajeCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResenaViajeCliente) filter?: Filter<ResenaViajeCliente>,
  ): Promise<ResenaViajeCliente[]> {
    return this.resenaViajeClienteRepository.find(filter);
  }

  @patch('/resena-viaje-cliente')
  @response(200, {
    description: 'ResenaViajeCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeCliente, {partial: true}),
        },
      },
    })
    resenaViajeCliente: ResenaViajeCliente,
    @param.where(ResenaViajeCliente) where?: Where<ResenaViajeCliente>,
  ): Promise<Count> {
    return this.resenaViajeClienteRepository.updateAll(resenaViajeCliente, where);
  }

  @get('/resena-viaje-cliente/{id}')
  @response(200, {
    description: 'ResenaViajeCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResenaViajeCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResenaViajeCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<ResenaViajeCliente>
  ): Promise<ResenaViajeCliente> {
    return this.resenaViajeClienteRepository.findById(id, filter);
  }

  @patch('/resena-viaje-cliente/{id}')
  @response(204, {
    description: 'ResenaViajeCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeCliente, {partial: true}),
        },
      },
    })
    resenaViajeCliente: ResenaViajeCliente,
  ): Promise<void> {
    await this.resenaViajeClienteRepository.updateById(id, resenaViajeCliente);
  }

  @put('/resena-viaje-cliente/{id}')
  @response(204, {
    description: 'ResenaViajeCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resenaViajeCliente: ResenaViajeCliente,
  ): Promise<void> {
    await this.resenaViajeClienteRepository.replaceById(id, resenaViajeCliente);
  }

  @del('/resena-viaje-cliente/{id}')
  @response(204, {
    description: 'ResenaViajeCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resenaViajeClienteRepository.deleteById(id);
  }
}
