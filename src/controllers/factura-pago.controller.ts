import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Pago,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaPagoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/pago', {
    responses: {
      '200': {
        description: 'Pago belonging to Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pago),
          },
        },
      },
    },
  })
  async getPago(
    @param.path.number('id') id: typeof Factura.prototype.idFactura,
  ): Promise<Pago> {
    return this.facturaRepository.pago(id);
  }
}
