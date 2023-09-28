import {Entity, model, property, hasMany} from '@loopback/repository';
import {Preferencia} from './preferencia.model';
import {Viaje} from './viaje.model';
import {JustificacionCliente} from './justificacion-cliente.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idCliente?: number;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
  })
  urlFoto?: string;

  @property({
    type: 'string',
    required: true,
  })
  correoPanico: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  idMongoDB?: string;

  @hasMany(() => Preferencia)
  preferencias: Preferencia[];

  @hasMany(() => Viaje)
  viajes: Viaje[];

  @hasMany(() => JustificacionCliente)
  justificacionClientes: JustificacionCliente[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
