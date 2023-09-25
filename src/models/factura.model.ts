import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {Pago} from './pago.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fkFacturaViaje: {
        name: 'fkFacturaViaje',
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

  @hasOne(() => Pago)
  pago: Pago;

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
