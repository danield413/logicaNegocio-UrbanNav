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
  Administrador,
} from '../models';
import {JustificacionClienteRepository} from '../repositories';

export class JustificacionClienteAdministradorController {
  constructor(
    @repository(JustificacionClienteRepository)
    public justificacionClienteRepository: JustificacionClienteRepository,
  ) { }

  @get('/justificacion-clientes/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to JustificacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador),
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.number('id') id: typeof JustificacionCliente.prototype.idJustificacion,
  ): Promise<Administrador> {
    return this.justificacionClienteRepository.administrador(id);
  }
}
