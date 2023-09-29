import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {Factura} from './factura.model';
import {MetodoPago} from './metodo-pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_pago_metodo_pago: {
        name: 'fk_pago_metodo_pago',
        entity: 'MetodoPago',
        entityKey: 'idMetodoPago',
        foreignKey: 'metodoPagoId',
      },
    },
  },
})
export class Pago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPago?: number;

  @property({
    type: 'number',
    required: true,
  })
  Total: number;

  @hasOne(() => Factura)
  factura: Factura;

  @belongsTo(() => MetodoPago)
  metodoPagoId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
