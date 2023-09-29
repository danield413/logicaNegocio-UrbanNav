import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Pago} from './pago.model';
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
      fk_factura_pagoid: {
        name: 'fk_factura_pagoid',
        entity: 'Pago',
        entityKey: 'idPago',
        foreignKey: 'pagoId',
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

  @belongsTo(() => Pago)
  pagoId: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
