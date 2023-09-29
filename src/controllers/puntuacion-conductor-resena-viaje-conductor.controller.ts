import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PuntuacionConductor,
  ResenaViajeConductor,
} from '../models';
import {PuntuacionConductorRepository} from '../repositories';

export class PuntuacionConductorResenaViajeConductorController {
  constructor(
    @repository(PuntuacionConductorRepository)
    public puntuacionConductorRepository: PuntuacionConductorRepository,
  ) { }

  @get('/puntuacion-conductors/{id}/resena-viaje-conductor', {
    responses: {
      '200': {
        description: 'ResenaViajeConductor belonging to PuntuacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResenaViajeConductor),
          },
        },
      },
    },
  })
  async getResenaViajeConductor(
    @param.path.number('id') id: typeof PuntuacionConductor.prototype.idPuntuacion,
  ): Promise<ResenaViajeConductor> {
    return this.puntuacionConductorRepository.resenaViajeConductor(id);
  }
}
