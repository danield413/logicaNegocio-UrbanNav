import {Entity, model, property} from '@loopback/repository';

@model()
export class JustificacionCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idJustificacion?: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  fechahora: string;


  constructor(data?: Partial<JustificacionCliente>) {
    super(data);
  }
}

export interface JustificacionClienteRelations {
  // describe navigational properties here
}

export type JustificacionClienteWithRelations = JustificacionCliente & JustificacionClienteRelations;
