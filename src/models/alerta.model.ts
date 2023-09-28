import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fkViajeid: {
        name: 'fk_alertaviaje_id',
        entity: 'Viaje',
        entityKey: 'idViaje',
        foreignKey: 'viajeId',
      },
    },
  }
})
export class Alerta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idAlerta?: number;

  @property({
    type: 'string',
    required: true,
  })
  fechahora: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  constructor(data?: Partial<Alerta>) {
    super(data);
  }
}

export interface AlertaRelations {
  // describe navigational properties here
}

export type AlertaWithRelations = Alerta & AlertaRelations;
