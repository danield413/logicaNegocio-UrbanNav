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
  Administrador,
  JustificacionConductor,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorJustificacionConductorController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Array of Administrador has many JustificacionConductor',
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
    return this.administradorRepository.justificacionConductors(id).find(filter);
  }

  @post('/administradors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(JustificacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Administrador.prototype.idAdministrador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JustificacionConductor, {
            title: 'NewJustificacionConductorInAdministrador',
            exclude: ['idJustificacion'],
            optional: ['administradorId']
          }),
        },
      },
    }) justificacionConductor: Omit<JustificacionConductor, 'idJustificacion'>,
  ): Promise<JustificacionConductor> {
    return this.administradorRepository.justificacionConductors(id).create(justificacionConductor);
  }

  @patch('/administradors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Administrador.JustificacionConductor PATCH success count',
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
    return this.administradorRepository.justificacionConductors(id).patch(justificacionConductor, where);
  }

  @del('/administradors/{id}/justificacion-conductors', {
    responses: {
      '200': {
        description: 'Administrador.JustificacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(JustificacionConductor)) where?: Where<JustificacionConductor>,
  ): Promise<Count> {
    return this.administradorRepository.justificacionConductors(id).delete(where);
  }
}
