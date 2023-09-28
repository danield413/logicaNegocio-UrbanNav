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
  Viaje,
  Factura,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeFacturaController {
  constructor(
    @repository(ViajeRepository) protected viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/factura', {
    responses: {
      '200': {
        description: 'Viaje has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.viajeRepository.factura(id).get(filter);
  }

  @post('/viajes/{id}/factura', {
    responses: {
      '200': {
        description: 'Viaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Viaje.prototype.idViaje,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInViaje',
            exclude: ['idFactura'],
            optional: ['viajeId']
          }),
        },
      },
    }) factura: Omit<Factura, 'idFactura'>,
  ): Promise<Factura> {
    return this.viajeRepository.factura(id).create(factura);
  }

  @patch('/viajes/{id}/factura', {
    responses: {
      '200': {
        description: 'Viaje.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.viajeRepository.factura(id).patch(factura, where);
  }

  @del('/viajes/{id}/factura', {
    responses: {
      '200': {
        description: 'Viaje.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.viajeRepository.factura(id).delete(where);
  }
}
