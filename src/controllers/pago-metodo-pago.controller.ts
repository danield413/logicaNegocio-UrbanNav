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
  Pago,
  MetodoPago,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoMetodoPagoController {
  constructor(
    @repository(PagoRepository) protected pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'Pago has one MetodoPago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MetodoPago),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago> {
    return this.pagoRepository.metodoPago(id).get(filter);
  }

  @post('/pagos/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'Pago model instance',
        content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pago.prototype.idPago,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPagoInPago',
            exclude: ['idMetodoPago'],
            optional: ['pagoId']
          }),
        },
      },
    }) metodoPago: Omit<MetodoPago, 'idMetodoPago'>,
  ): Promise<MetodoPago> {
    return this.pagoRepository.metodoPago(id).create(metodoPago);
  }

  @patch('/pagos/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'Pago.MetodoPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: Partial<MetodoPago>,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.pagoRepository.metodoPago(id).patch(metodoPago, where);
  }

  @del('/pagos/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'Pago.MetodoPago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.pagoRepository.metodoPago(id).delete(where);
  }
}
