import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ResenaViajeConductor,
  Viaje,
} from '../models';
import {ResenaViajeConductorRepository} from '../repositories';

export class ResenaViajeConductorViajeController {
  constructor(
    @repository(ResenaViajeConductorRepository)
    public resenaViajeConductorRepository: ResenaViajeConductorRepository,
  ) { }

  @get('/resena-viaje-conductors/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to ResenaViajeConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof ResenaViajeConductor.prototype.idResena,
  ): Promise<Viaje> {
    return this.resenaViajeConductorRepository.viaje(id);
  }
}
