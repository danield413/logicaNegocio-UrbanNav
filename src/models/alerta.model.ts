import {Entity, model, property} from '@loopback/repository';

@model()
export class Alerta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idAlerta?: number;

  @property({
    type: 'string',
    required: true,
  })
  fechahora: string;


  constructor(data?: Partial<Alerta>) {
    super(data);
  }
}

export interface AlertaRelations {
  // describe navigational properties here
}

export type AlertaWithRelations = Alerta & AlertaRelations;
