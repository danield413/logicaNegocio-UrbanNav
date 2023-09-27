import {Entity, model, property} from '@loopback/repository';

@model()
export class PuntuacionCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPuntuacion?: number;

  @property({
    type: 'number',
  })
  puntuacion?: number;

  constructor(data?: Partial<PuntuacionCliente>) {
    super(data);
  }
}

export interface PuntuacionClienteRelations {
  // describe navigational properties here
}

export type PuntuacionWithRelations = PuntuacionCliente &
  PuntuacionClienteRelations;
