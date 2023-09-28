import {Entity, model, property, hasMany} from '@loopback/repository';
import {Viaje} from './viaje.model';

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

  @hasMany(() => Viaje)
  viajes: Viaje[];

  constructor(data?: Partial<Recorrido>) {
    super(data);
  }
}

export interface RecorridoRelations {
  // describe navigational properties here
}

export type RecorridoWithRelations = Recorrido & RecorridoRelations;
