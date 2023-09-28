import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fkViajeId: {
        name: 'fk_resenaviajeconductor_viajeid',
        entity: 'Viaje',
        entityKey: 'idViaje',
        foreignKey: 'viajeId',
      },
    },
  }
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

  constructor(data?: Partial<ResenaViajeConductor>) {
    super(data);
  }
}

export interface ResenaViajeConductorRelations {
  // describe navigational properties here
}

export type ResenaViajeConductorWithRelations = ResenaViajeConductor & ResenaViajeConductorRelations;
