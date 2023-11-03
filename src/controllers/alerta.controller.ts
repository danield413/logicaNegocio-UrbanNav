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
import {Alerta} from '../models';
import {AlertaRepository, ViajeRepository, ClienteRepository, ConductorRepository} from '../repositories';
import { LogicaServicioService } from '../services';
import {service} from '@loopback/core';
import axios from 'axios';

export class AlertaController {
  constructor(
    @repository(AlertaRepository)
    public alertaRepository : AlertaRepository,
    @repository(ViajeRepository)
    public viajeRepository : ViajeRepository,
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(ConductorRepository)
    public conductorRepository : ConductorRepository,
    @service(LogicaServicioService)
    public servicioLogica : LogicaServicioService
  ) {}

  @post('/alerta')
  @response(200, {
    description: 'Alerta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Alerta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerta, {
            title: 'NewAlerta',
            exclude: ['idAlerta'],
          }),
        },
      },
    })
    alerta: Omit<Alerta, 'idAlerta'>,
  ): Promise<Alerta> {
    return this.alertaRepository.create(alerta);
  }

  @post('/generar-alerta')
  @response(200, {
    description: 'Factura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Alerta)}},
  })
  async generateFactura(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerta, {
            title: 'NewAlerta',
            exclude: ['idAlerta'],
          }),
        },
      },
    })
    alerta: Omit<Alerta, 'idAlerta'>,
  ): Promise<Alerta> {
    let AlertaCreada = await this.alertaRepository.create(alerta);
    //TODO: LLAMAR A NOTIFICACIONES PARA ENVIAR LA ALERTA AL CORREO DE PANICO DEL USUARIO
    let viaje = await this.viajeRepository.findById(alerta.viajeId);
    let cliente = await this.clienteRepository.findById(viaje.clienteId);
    let conductor = await this.conductorRepository.findById(viaje.conductorId);
    let mongoid = await this.servicioLogica.obtenerInformacionUsuarioEnSeguridad(cliente.idMongoDB!);
    console.log(mongoid.usuario.correo)
    axios.post('http://localhost:8080/enviar-correo', {
      to: cliente.correoPanico,
      name: cliente.correoPanico,
      content:`Hola, ${cliente.primerNombre} ${cliente.primerApellido},que va en el viaje ${viaje.idViaje}, se encuentra en peligro, El conductor que lo transporta es: ${conductor.primerNombre}  ${conductor.primerApellido} `,
      subject: 'Alerta de viaje'
    })
    return AlertaCreada;
  }

  @get('/alerta/count')
  @response(200, {
    description: 'Alerta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Alerta) where?: Where<Alerta>,
  ): Promise<Count> {
    return this.alertaRepository.count(where);
  }

  @get('/alerta')
  @response(200, {
    description: 'Array of Alerta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Alerta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Alerta) filter?: Filter<Alerta>,
  ): Promise<Alerta[]> {
    return this.alertaRepository.find(filter);
  }

  @patch('/alerta')
  @response(200, {
    description: 'Alerta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerta, {partial: true}),
        },
      },
    })
    alerta: Alerta,
    @param.where(Alerta) where?: Where<Alerta>,
  ): Promise<Count> {
    return this.alertaRepository.updateAll(alerta, where);
  }

  @get('/alerta/{id}')
  @response(200, {
    description: 'Alerta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Alerta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Alerta, {exclude: 'where'}) filter?: FilterExcludingWhere<Alerta>
  ): Promise<Alerta> {
    return this.alertaRepository.findById(id, filter);
  }

  @patch('/alerta/{id}')
  @response(204, {
    description: 'Alerta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerta, {partial: true}),
        },
      },
    })
    alerta: Alerta,
  ): Promise<void> {
    await this.alertaRepository.updateById(id, alerta);
  }

  @put('/alerta/{id}')
  @response(204, {
    description: 'Alerta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() alerta: Alerta,
  ): Promise<void> {
    await this.alertaRepository.replaceById(id, alerta);
  }

  @del('/alerta/{id}')
  @response(204, {
    description: 'Alerta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alertaRepository.deleteById(id);
  }
}
