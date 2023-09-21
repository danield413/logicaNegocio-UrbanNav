import {Entity, model, property} from '@loopback/repository';

@model()
export class Preferencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPreferencia?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;


  constructor(data?: Partial<Preferencia>) {
    super(data);
  }
}

export interface PreferenciaRelations {
  // describe navigational properties here
}

export type PreferenciaWithRelations = Preferencia & PreferenciaRelations;
