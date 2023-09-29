import {Entity, model, property, hasMany} from '@loopback/repository';
import {JustificacionCliente} from './justificacion-cliente.model';
import {JustificacionConductor} from './justificacion-conductor.model';

@model()
export class Administrador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idAdministrador?: number;

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
  })
  idMongoDB?: string;

  @hasMany(() => JustificacionCliente)
  justificacionClientes: JustificacionCliente[];

  @hasMany(() => JustificacionConductor)
  justificacionConductors: JustificacionConductor[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
