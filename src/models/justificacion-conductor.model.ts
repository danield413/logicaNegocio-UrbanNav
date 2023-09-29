import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fkConductorId: {
        name: 'fk_conductorjustificacion_id',
        entity: 'Conductor',
        entityKey: 'idConductor',
        foreignKey: 'conductorId',
      },
      fkAdministradorId: {
        name: 'fk_administradorjustificacion_id',
        entity: 'Administrador',
        entityKey: 'idAdministrador',
        foreignKey: 'administradorId',
      },
    },
  },
})
export class JustificacionConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idJustificacion?: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  fechahora: string;

  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => Administrador)
  administradorId: number;

  constructor(data?: Partial<JustificacionConductor>) {
    super(data);
  }
}

export interface JustificacionConductorRelations {
  // describe navigational properties here
}

export type JustificacionConductorWithRelations = JustificacionConductor &
  JustificacionConductorRelations;
