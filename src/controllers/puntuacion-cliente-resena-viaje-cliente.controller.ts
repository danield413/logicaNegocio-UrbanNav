import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PuntuacionCliente,
  ResenaViajeCliente,
} from '../models';
import {PuntuacionClienteRepository} from '../repositories';

export class PuntuacionClienteResenaViajeClienteController {
  constructor(
    @repository(PuntuacionClienteRepository)
    public puntuacionClienteRepository: PuntuacionClienteRepository,
  ) { }

  @get('/puntuacion-clientes/{id}/resena-viaje-cliente', {
    responses: {
      '200': {
        description: 'ResenaViajeCliente belonging to PuntuacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResenaViajeCliente),
          },
        },
      },
    },
  })
  async getResenaViajeCliente(
    @param.path.number('id') id: typeof PuntuacionCliente.prototype.idPuntuacion,
  ): Promise<ResenaViajeCliente> {
    return this.puntuacionClienteRepository.resenaViajeCliente(id);
  }
}
