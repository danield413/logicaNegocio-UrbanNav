import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pago} from '../models';
import {PagoRepository} from '../repositories';
import { LogicaServicioService } from '../services/logica-servicio.service';
import {service} from '@loopback/core';

export class PagoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository : PagoRepository,
    @service(LogicaServicioService)
    public servicioLogica: LogicaServicioService,
  ) {}

  @post('/pago')
  @response(200, {
    description: 'Pago model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPago',
            exclude: ['idPago'],
          }),
        },
      },
    })
    pago: Omit<Pago, 'idPago'>,
  ): Promise<Pago> {
    return this.pagoRepository.create(pago);
  }

  @post('/generar-pago')
  @response(200, {
    description: 'Pago model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pago)}},
  })
  async generatePago(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Object)
        },
      },
    })
    pagoARealizar: any,
  ): Promise<Pago> {
    let idRecorrido = pagoARealizar.idRecorrido;
    let total = await this.servicioLogica.calcularPrecioRecorrido(idRecorrido);

    let pago = {
      Total: total.precio as number,
      metodoPagoId: pagoARealizar.metodoPagoId as number,
    }

    let pagoCreado = await this.pagoRepository.create(pago);
    return pagoCreado;
  }

  @get('/pago/count')
  @response(200, {
    description: 'Pago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pago) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pagoRepository.count(where);
  }

  @get('/pago')
  @response(200, {
    description: 'Array of Pago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pago) filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.pagoRepository.find(filter);
  }

  @patch('/pago')
  @response(200, {
    description: 'Pago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Pago,
    @param.where(Pago) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pagoRepository.updateAll(pago, where);
  }

  @get('/pago/{id}')
  @response(200, {
    description: 'Pago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pago, {exclude: 'where'}) filter?: FilterExcludingWhere<Pago>
  ): Promise<Pago> {
    return this.pagoRepository.findById(id, filter);
  }

  @patch('/pago/{id}')
  @response(204, {
    description: 'Pago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Pago,
  ): Promise<void> {
    await this.pagoRepository.updateById(id, pago);
  }

  @put('/pago/{id}')
  @response(204, {
    description: 'Pago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pago: Pago,
  ): Promise<void> {
    await this.pagoRepository.replaceById(id, pago);
  }

  @del('/pago/{id}')
  @response(204, {
    description: 'Pago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagoRepository.deleteById(id);
  }
}
