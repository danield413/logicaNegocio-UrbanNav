import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<MetodoPago>) {
    super(data);
  }
}

export interface MetodoPagoRelations {
  // describe navigational properties here
}

export type MetodoPagoWithRelations = MetodoPago & MetodoPagoRelations;
