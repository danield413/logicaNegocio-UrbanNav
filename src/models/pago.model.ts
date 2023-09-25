import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {Factura} from './factura.model';
import {MetodoPago} from './metodo-pago.model';

@model({
  settings: {
    foreignKeys: {
      fkPagoMetodoPago: {
        name: 'fkPagoMetodoPago',
        entity: 'MetodoPago',
        entityKey: 'idMetodoPago',
        foreignKey: 'metodoPagoId',
      },
      fkPagoFactura: {
        name: 'fkPagoFactura',
        entity: 'Factura',
        entityKey: 'idFactura',
        foreignKey: 'facturaId',
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

  @hasOne(() => MetodoPago)
  metodoPago: MetodoPago;

  @property({
    type: 'number',
  })
  metodoPagoId?: number;

  @belongsTo(() => Factura)
  facturaId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
