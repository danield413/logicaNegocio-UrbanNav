import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conductor,
  Barrio,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorBarrioController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/barrio', {
    responses: {
      '200': {
        description: 'Barrio belonging to Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Barrio),
          },
        },
      },
    },
  })
  async getBarrio(
    @param.path.number('id') id: typeof Conductor.prototype.idConductor,
  ): Promise<Barrio> {
    return this.conductorRepository.barrio(id);
  }
}
