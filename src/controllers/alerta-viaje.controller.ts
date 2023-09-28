import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Alerta,
  Viaje,
} from '../models';
import {AlertaRepository} from '../repositories';

export class AlertaViajeController {
  constructor(
    @repository(AlertaRepository)
    public alertaRepository: AlertaRepository,
  ) { }

  @get('/alertas/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to Alerta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof Alerta.prototype.idAlerta,
  ): Promise<Viaje> {
    return this.alertaRepository.viaje(id);
  }
}
