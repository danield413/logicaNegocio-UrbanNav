import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  JustificacionCliente,
  Cliente,
} from '../models';
import {JustificacionClienteRepository} from '../repositories';

export class JustificacionClienteClienteController {
  constructor(
    @repository(JustificacionClienteRepository)
    public justificacionClienteRepository: JustificacionClienteRepository,
  ) { }

  @get('/justificacion-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to JustificacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof JustificacionCliente.prototype.idJustificacion,
  ): Promise<Cliente> {
    return this.justificacionClienteRepository.cliente(id);
  }
}
