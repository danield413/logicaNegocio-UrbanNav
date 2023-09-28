import {Entity, model, property} from '@loopback/repository';

@model()
export class Recorrido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idRecorrido?: number;

  @property({
    type: 'number',
    required: true,
  })
  DistanciaKM: number;

  constructor(data?: Partial<Recorrido>) {
    super(data);
  }
}

export interface RecorridoRelations {
  // describe navigational properties here
}

export type RecorridoWithRelations = Recorrido & RecorridoRelations;
