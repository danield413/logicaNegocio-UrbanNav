import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {PuntuacionConductor} from './puntuacion-conductor.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_resena_viaje_conductor_viajeid: {
        name: 'fk_resena_viaje_conductor_viajeid',
        entity: 'Viaje',
        entityKey: 'idViaje',
        foreignKey: 'viajeId',
      },
    },
  },
})
export class ResenaViajeConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idResena?: number;

  @property({
    type: 'string',
  })
  comentario?: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  @hasOne(() => PuntuacionConductor)
  puntuacionConductor: PuntuacionConductor;

  constructor(data?: Partial<ResenaViajeConductor>) {
    super(data);
  }
}

export interface ResenaViajeConductorRelations {
  // describe navigational properties here
}

export type ResenaViajeConductorWithRelations = ResenaViajeConductor & ResenaViajeConductorRelations;
