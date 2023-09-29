import {Entity, belongsTo, model, property} from '@loopback/repository';
import {ResenaViajeConductor} from './resena-viaje-conductor.model';

@model({
  settings: {
    foreignKeys: {
      fk_resena_conductorid: {
        name: 'fk_resena_conductorid',
        entity: 'ResenaViajeConductor',
        entityKey: 'idResena',
        foreignKey: 'resenaViajeConductorId',
      },
    },
  },
})
export class PuntuacionConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPuntuacion?: number;

  @property({
    type: 'number',
  })
  puntuacion?: number;

  @belongsTo(() => ResenaViajeConductor)
  resenaViajeConductorId: number;

  constructor(data?: Partial<PuntuacionConductor>) {
    super(data);
  }
}

export interface PuntuacionConductorRelations {
  // describe navigational properties here
}

export type PuntuacionConductorWithRelations = PuntuacionConductor & PuntuacionConductorRelations;
