import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Viaje,
  Recorrido,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeRecorridoController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/recorrido', {
    responses: {
      '200': {
        description: 'Recorrido belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Recorrido),
          },
        },
      },
    },
  })
  async getRecorrido(
    @param.path.number('id') id: typeof Viaje.prototype.idViaje,
  ): Promise<Recorrido> {
    return this.viajeRepository.recorrido(id);
  }
}
