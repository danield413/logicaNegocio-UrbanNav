import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pago} from './pago.model';

@model()
export class MetodoPago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idMetodoPago?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'number',
  })
  pagoId?: number;

  @hasMany(() => Pago)
  pagos: Pago[];

  constructor(data?: Partial<MetodoPago>) {
    super(data);
  }
}

export interface MetodoPagoRelations {
  // describe navigational properties here
}

export type MetodoPagoWithRelations = MetodoPago & MetodoPagoRelations;
