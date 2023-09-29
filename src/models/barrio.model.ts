import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      fkCiudadId: {
        name: 'fk_ciudad_id',
        entity: 'Ciudad',
        entityKey: 'idCiudad',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Barrio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idBarrio?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreBarrio: string;

  @property({
    type: 'string',
  })
  Descripcion?: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Barrio>) {
    super(data);
  }
}

export interface BarrioRelations {
  // describe navigational properties here
}

export type BarrioWithRelations = Barrio & BarrioRelations;
