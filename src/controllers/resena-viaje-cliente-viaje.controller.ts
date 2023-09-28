import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ResenaViajeCliente,
  Viaje,
} from '../models';
import {ResenaViajeClienteRepository} from '../repositories';

export class ResenaViajeClienteViajeController {
  constructor(
    @repository(ResenaViajeClienteRepository)
    public resenaViajeClienteRepository: ResenaViajeClienteRepository,
  ) { }

  @get('/resena-viaje-clientes/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to ResenaViajeCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof ResenaViajeCliente.prototype.idResena,
  ): Promise<Viaje> {
    return this.resenaViajeClienteRepository.viaje(id);
  }
}
