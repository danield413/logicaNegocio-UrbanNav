import {Entity, model, property} from '@loopback/repository';

@model()
export class Barrio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idBarrio?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreBarrio: string;

  @property({
    type: 'string',
  })
  Descripcion?: string;


  constructor(data?: Partial<Barrio>) {
    super(data);
  }
}

export interface BarrioRelations {
  // describe navigational properties here
}

export type BarrioWithRelations = Barrio & BarrioRelations;
