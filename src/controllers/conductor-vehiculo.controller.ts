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
  Conductor,
  Vehiculo,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorVehiculoController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Conductor has one Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo> {
    return this.conductorRepository.vehiculo(id).get(filter);
  }

  @post('/conductors/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.idConductor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInConductor',
            exclude: ['idVehiculo'],
            optional: ['conductorId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'idVehiculo'>,
  ): Promise<Vehiculo> {
    return this.conductorRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/conductors/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Conductor.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.conductorRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/conductors/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Conductor.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.conductorRepository.vehiculo(id).delete(where);
  }
}
