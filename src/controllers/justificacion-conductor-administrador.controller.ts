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
  Administrador,
} from '../models';
import {JustificacionConductorRepository} from '../repositories';

export class JustificacionConductorAdministradorController {
  constructor(
    @repository(JustificacionConductorRepository)
    public justificacionConductorRepository: JustificacionConductorRepository,
  ) { }

  @get('/justificacion-conductors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to JustificacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador),
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.number('id') id: typeof JustificacionConductor.prototype.idJustificacion,
  ): Promise<Administrador> {
    return this.justificacionConductorRepository.administrador(id);
  }
}
