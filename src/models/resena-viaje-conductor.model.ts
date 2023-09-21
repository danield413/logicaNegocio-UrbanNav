import {Entity, model, property} from '@loopback/repository';

@model()
export class ResenaViajeConductor extends Entity {
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


  constructor(data?: Partial<ResenaViajeConductor>) {
    super(data);
  }
}

export interface ResenaViajeConductorRelations {
  // describe navigational properties here
}

export type ResenaViajeConductorWithRelations = ResenaViajeConductor & ResenaViajeConductorRelations;
