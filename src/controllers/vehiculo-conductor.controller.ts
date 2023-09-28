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
  Vehiculo,
  Conductor,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoConductorController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/conductor', {
    responses: {
      '200': {
        description: 'Vehiculo has one Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Conductor>,
  ): Promise<Conductor> {
    return this.vehiculoRepository.conductor(id).get(filter);
  }

  @post('/vehiculos/{id}/conductor', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehiculo.prototype.idVehiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductorInVehiculo',
            exclude: ['idConductor'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) conductor: Omit<Conductor, 'idConductor'>,
  ): Promise<Conductor> {
    return this.vehiculoRepository.conductor(id).create(conductor);
  }

  @patch('/vehiculos/{id}/conductor', {
    responses: {
      '200': {
        description: 'Vehiculo.Conductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Partial<Conductor>,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.vehiculoRepository.conductor(id).patch(conductor, where);
  }

  @del('/vehiculos/{id}/conductor', {
    responses: {
      '200': {
        description: 'Vehiculo.Conductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.vehiculoRepository.conductor(id).delete(where);
  }
}
