import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Factura,
  Pago,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaPagoController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/pago', {
    responses: {
      '200': {
        description: 'Factura has one Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pago),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago> {
    return this.facturaRepository.pago(id).get(filter);
  }

  @post('/facturas/{id}/pago', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Factura.prototype.idFactura,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInFactura',
            exclude: ['idPago'],
            optional: ['facturaId']
          }),
        },
      },
    }) pago: Omit<Pago, 'idPago'>,
  ): Promise<Pago> {
    return this.facturaRepository.pago(id).create(pago);
  }

  @patch('/facturas/{id}/pago', {
    responses: {
      '200': {
        description: 'Factura.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.facturaRepository.pago(id).patch(pago, where);
  }

  @del('/facturas/{id}/pago', {
    responses: {
      '200': {
        description: 'Factura.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.facturaRepository.pago(id).delete(where);
  }
}
