import {Entity, model, property, hasOne} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
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

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
