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
  MetodoPago,
  Pago,
} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodoPagoPagoController {
  constructor(
    @repository(MetodoPagoRepository) protected metodoPagoRepository: MetodoPagoRepository,
  ) { }

  @get('/metodo-pagos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of MetodoPago has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.metodoPagoRepository.pagos(id).find(filter);
  }

  @post('/metodo-pagos/{id}/pagos', {
    responses: {
      '200': {
        description: 'MetodoPago model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MetodoPago.prototype.idMetodoPago,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInMetodoPago',
            exclude: ['idPago'],
            optional: ['metodoPagoId']
          }),
        },
      },
    }) pago: Omit<Pago, 'idPago'>,
  ): Promise<Pago> {
    return this.metodoPagoRepository.pagos(id).create(pago);
  }

  @patch('/metodo-pagos/{id}/pagos', {
    responses: {
      '200': {
        description: 'MetodoPago.Pago PATCH success count',
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
    return this.metodoPagoRepository.pagos(id).patch(pago, where);
  }

  @del('/metodo-pagos/{id}/pagos', {
    responses: {
      '200': {
        description: 'MetodoPago.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.pagos(id).delete(where);
  }
}
