import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  MetodoPago,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoMetodoPagoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'MetodoPago belonging to Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MetodoPago),
          },
        },
      },
    },
  })
  async getMetodoPago(
    @param.path.number('id') id: typeof Pago.prototype.idPago,
  ): Promise<MetodoPago> {
    return this.pagoRepository.metodoPago(id);
  }
}
