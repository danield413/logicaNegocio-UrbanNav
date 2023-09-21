import {Entity, model, property} from '@loopback/repository';

@model()
export class JustificacionConductor extends Entity {
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


  constructor(data?: Partial<JustificacionConductor>) {
    super(data);
  }
}

export interface JustificacionConductorRelations {
  // describe navigational properties here
}

export type JustificacionConductorWithRelations = JustificacionConductor & JustificacionConductorRelations;
