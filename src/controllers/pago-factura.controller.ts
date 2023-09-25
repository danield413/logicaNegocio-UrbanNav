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
  Factura,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoFacturaController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.number('id') id: typeof Pago.prototype.idPago,
  ): Promise<Factura> {
    return this.pagoRepository.factura(id);
  }
}
