import {Entity, model, property} from '@loopback/repository';

@model()
export class ResenaViajeCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idResena?: number;

  @property({
    type: 'string',
  })
  comentario?: string;


  constructor(data?: Partial<ResenaViajeCliente>) {
    super(data);
  }
}

export interface ResenaViajeClienteRelations {
  // describe navigational properties here
}

export type ResenaViajeClienteWithRelations = ResenaViajeCliente & ResenaViajeClienteRelations;
