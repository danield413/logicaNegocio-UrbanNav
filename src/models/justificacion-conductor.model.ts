import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fkConductorId: {
        name: 'fk_conductor_id',
        entity: 'Conductor',
        entityKey: 'idConductor',
        foreignKey: 'conductorId',
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

  constructor(data?: Partial<JustificacionConductor>) {
    super(data);
  }
}

export interface JustificacionConductorRelations {
  // describe navigational properties here
}

export type JustificacionConductorWithRelations = JustificacionConductor &
  JustificacionConductorRelations;
