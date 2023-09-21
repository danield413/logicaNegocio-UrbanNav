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

export interface PuntuacionRelations {
  // describe navigational properties here
}

export type PuntuacionWithRelations = PuntuacionCliente & PuntuacionRelations;
