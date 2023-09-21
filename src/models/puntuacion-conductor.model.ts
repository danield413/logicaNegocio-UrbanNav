import {Entity, model, property} from '@loopback/repository';

@model()
export class PuntuacionConductor extends Entity {
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


  constructor(data?: Partial<PuntuacionConductor>) {
    super(data);
  }
}

export interface PuntuacionConductorRelations {
  // describe navigational properties here
}

export type PuntuacionConductorWithRelations = PuntuacionConductor & PuntuacionConductorRelations;
