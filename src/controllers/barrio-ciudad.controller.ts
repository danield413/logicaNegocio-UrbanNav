import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Barrio,
  Ciudad,
} from '../models';
import {BarrioRepository} from '../repositories';

export class BarrioCiudadController {
  constructor(
    @repository(BarrioRepository)
    public barrioRepository: BarrioRepository,
  ) { }

  @get('/barrios/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Barrio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad),
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Barrio.prototype.idBarrio,
  ): Promise<Ciudad> {
    return this.barrioRepository.ciudad(id);
  }
}
