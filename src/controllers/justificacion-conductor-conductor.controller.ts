import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  JustificacionConductor,
  Conductor,
} from '../models';
import {JustificacionConductorRepository} from '../repositories';

export class JustificacionConductorConductorController {
  constructor(
    @repository(JustificacionConductorRepository)
    public justificacionConductorRepository: JustificacionConductorRepository,
  ) { }

  @get('/justificacion-conductors/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to JustificacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof JustificacionConductor.prototype.idJustificacion,
  ): Promise<Conductor> {
    return this.justificacionConductorRepository.conductor(id);
  }
}
