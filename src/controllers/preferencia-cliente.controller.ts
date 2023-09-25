import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Preferencia,
  Cliente,
} from '../models';
import {PreferenciaRepository} from '../repositories';

export class PreferenciaClienteController {
  constructor(
    @repository(PreferenciaRepository)
    public preferenciaRepository: PreferenciaRepository,
  ) { }

  @get('/preferencias/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Preferencia',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Preferencia.prototype.idPreferencia,
  ): Promise<Cliente> {
    return this.preferenciaRepository.cliente(id);
  }
}
