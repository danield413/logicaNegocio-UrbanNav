import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import axios from 'axios';
import {Factura} from '../models';
import {ClienteRepository, FacturaRepository, PagoRepository, ViajeRepository} from '../repositories';
import {LogicaServicioService} from '../services';

export class FacturaController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(LogicaServicioService)
    public servicioLogica: LogicaServicioService,
  ) { }

  //TODO: HACER EL METODO PARA GENERAR LA FACTURA
  @post('/generar-factura')
  @response(200, {
    description: 'Factura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Factura)}},
  })
  async generateFactura(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFactura',
            exclude: ['idFactura'],
          }),
        },
      },
    })
    factura: Omit<Factura, 'idFactura'>,
  ): Promise<Factura> {
    let facturaCreada = await this.facturaRepository.create(factura);
    //TODO: LLAMAR A NOTIFICACIONES PARA ENVIAR LA FACTURA AL USUARIO
    let viaje = await this.viajeRepository.findById(factura.viajeId);
    let pago = await this.pagoRepository.findById(factura.pagoId);
    let cliente = await this.clienteRepository.findById(viaje.clienteId);
    let mongoid = await this.servicioLogica.obtenerInformacionUsuarioEnSeguridad(cliente.idMongoDB!);
    console.log(mongoid.usuario.correo)
    axios.post('http://localhost:8080/enviar-correo', {
      to: mongoid.usuario.correo,
      name: cliente.primerNombre,
      content: `Hola ${cliente.primerNombre} ${cliente.primerApellido}, tu factura del viaje ${viaje.idViaje} es de ${pago.Total} pesos.`,
      subject: 'Factura de viaje'
    })
    return facturaCreada;
  }

  @post('/factura')
  @response(200, {
    description: 'Factura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Factura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFactura',
            exclude: ['idFactura'],
          }),
        },
      },
    })
    factura: Omit<Factura, 'idFactura'>,
  ): Promise<Factura> {
    return this.facturaRepository.create(factura);
  }

  @get('/factura/count')
  @response(200, {
    description: 'Factura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Factura) where?: Where<Factura>,
  ): Promise<Count> {
    return this.facturaRepository.count(where);
  }

  @get('/factura')
  @response(200, {
    description: 'Array of Factura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Factura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Factura) filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.facturaRepository.find(filter);
  }

  @patch('/factura')
  @response(200, {
    description: 'Factura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Factura,
    @param.where(Factura) where?: Where<Factura>,
  ): Promise<Count> {
    return this.facturaRepository.updateAll(factura, where);
  }

  @get('/factura/{id}')
  @response(200, {
    description: 'Factura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Factura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Factura, {exclude: 'where'}) filter?: FilterExcludingWhere<Factura>
  ): Promise<Factura> {
    return this.facturaRepository.findById(id, filter);
  }

  @patch('/factura/{id}')
  @response(204, {
    description: 'Factura PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Factura,
  ): Promise<void> {
    await this.facturaRepository.updateById(id, factura);
  }

  @put('/factura/{id}')
  @response(204, {
    description: 'Factura PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() factura: Factura,
  ): Promise<void> {
    await this.facturaRepository.replaceById(id, factura);
  }

  @del('/factura/{id}')
  @response(204, {
    description: 'Factura DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facturaRepository.deleteById(id);
  }
}
