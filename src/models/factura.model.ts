import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_factura_viajeid: {
        name: 'fk_factura_viajeid',
        entity: 'Viaje',
        entityKey: 'idViaje',
        foreignKey: 'viajeId',
      },
    },
  },
})
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idFactura?: number;

  @property({
    type: 'string',
    required: true,
  })
  fechahora: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
