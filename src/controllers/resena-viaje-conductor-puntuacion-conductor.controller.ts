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
  ResenaViajeConductor,
  PuntuacionConductor,
} from '../models';
import {ResenaViajeConductorRepository} from '../repositories';

export class ResenaViajeConductorPuntuacionConductorController {
  constructor(
    @repository(ResenaViajeConductorRepository) protected resenaViajeConductorRepository: ResenaViajeConductorRepository,
  ) { }

  @get('/resena-viaje-conductors/{id}/puntuacion-conductor', {
    responses: {
      '200': {
        description: 'ResenaViajeConductor has one PuntuacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PuntuacionConductor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PuntuacionConductor>,
  ): Promise<PuntuacionConductor> {
    return this.resenaViajeConductorRepository.puntuacionConductor(id).get(filter);
  }

  @post('/resena-viaje-conductors/{id}/puntuacion-conductor', {
    responses: {
      '200': {
        description: 'ResenaViajeConductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(PuntuacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ResenaViajeConductor.prototype.idResena,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionConductor, {
            title: 'NewPuntuacionConductorInResenaViajeConductor',
            exclude: ['idPuntuacion'],
            optional: ['resenaViajeConductorId']
          }),
        },
      },
    }) puntuacionConductor: Omit<PuntuacionConductor, 'idPuntuacion'>,
  ): Promise<PuntuacionConductor> {
    return this.resenaViajeConductorRepository.puntuacionConductor(id).create(puntuacionConductor);
  }

  @patch('/resena-viaje-conductors/{id}/puntuacion-conductor', {
    responses: {
      '200': {
        description: 'ResenaViajeConductor.PuntuacionConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuntuacionConductor, {partial: true}),
        },
      },
    })
    puntuacionConductor: Partial<PuntuacionConductor>,
    @param.query.object('where', getWhereSchemaFor(PuntuacionConductor)) where?: Where<PuntuacionConductor>,
  ): Promise<Count> {
    return this.resenaViajeConductorRepository.puntuacionConductor(id).patch(puntuacionConductor, where);
  }

  @del('/resena-viaje-conductors/{id}/puntuacion-conductor', {
    responses: {
      '200': {
        description: 'ResenaViajeConductor.PuntuacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PuntuacionConductor)) where?: Where<PuntuacionConductor>,
  ): Promise<Count> {
    return this.resenaViajeConductorRepository.puntuacionConductor(id).delete(where);
  }
}
