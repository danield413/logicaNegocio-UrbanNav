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
  JustificacionConductor,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorJustificacionConductorController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Array of Conductor has many JustificacionConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(JustificacionConductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<JustificacionConductor>,
  ): Promise<JustificacionConductor[]> {
    return this.conductorRepository.justificacionConductors(id).find(filter);
  }

  @post('/conductors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(JustificacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.idConductor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionConductor, {
            title: 'NewJustificacionConductorInConductor',
            exclude: ['idJustificacion'],
            optional: ['conductorId']
          }),
        },
      },
    }) justificacionConductor: Omit<JustificacionConductor, 'idJustificacion'>,
  ): Promise<JustificacionConductor> {
    return this.conductorRepository.justificacionConductors(id).create(justificacionConductor);
  }

  @patch('/conductors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor.JustificacionConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionConductor, {partial: true}),
        },
      },
    })
    justificacionConductor: Partial<JustificacionConductor>,
    @param.query.object('where', getWhereSchemaFor(JustificacionConductor)) where?: Where<JustificacionConductor>,
  ): Promise<Count> {
    return this.conductorRepository.justificacionConductors(id).patch(justificacionConductor, where);
  }

  @del('/conductors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor.JustificacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(JustificacionConductor)) where?: Where<JustificacionConductor>,
  ): Promise<Count> {
    return this.conductorRepository.justificacionConductors(id).delete(where);
  }
}
