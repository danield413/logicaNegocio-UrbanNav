import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Barrio} from './barrio.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fkBarrioOrigenId: {
        name: 'fk_barrio_origen_id',
        entity: 'Barrio',
        entityKey: 'idBarrio',
        foreignKey: 'barrioOrigenId',
      },
      fkBarrioDestinoId: {
        name: 'fk_barrio_destino_id',
        entity: 'Barrio',
        entityKey: 'idBarrio',
        foreignKey: 'barrioDestinoId',
      },
    },
  },
})
export class Recorrido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idRecorrido?: number;

  @property({
    type: 'number',
    required: true,
  })
  DistanciaKM: number;

  @hasMany(() => Viaje)
  viajes: Viaje[];

  @belongsTo(() => Barrio)
  barrioOrigenId: number;

  @belongsTo(() => Barrio)
  barrioDestinoId: number;

  constructor(data?: Partial<Recorrido>) {
    super(data);
  }
}

export interface RecorridoRelations {
  // describe navigational properties here
}

export type RecorridoWithRelations = Recorrido & RecorridoRelations;
