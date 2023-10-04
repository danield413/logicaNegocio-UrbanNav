import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Barrio} from './barrio.model';
import {JustificacionConductor} from './justificacion-conductor.model';
import {Vehiculo} from './vehiculo.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fkVehiculoId: {
        name: 'fk_vehiculo_id',
        entity: 'Vehiculo',
        entityKey: 'idVehiculo',
        foreignKey: 'vehiculoId',
      },
      fkBarrioId: {
        name: 'fk_barrio_id',
        entity: 'Barrio',
        entityKey: 'idBarrio',
        foreignKey: 'barrioId',
      },
    },
  },
})
export class Conductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idConductor?: number;

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
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  documentoIdentidad: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoServicio: string;

  @property({
    type: 'string',
  })
  idMongoDB?: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: number;

  @hasMany(() => Viaje)
  viajes: Viaje[];

  @hasMany(() => JustificacionConductor)
  justificacionConductors: JustificacionConductor[];

  @belongsTo(() => Barrio)
  barrioId: number;

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
