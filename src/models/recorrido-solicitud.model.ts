import {Model, model, property} from '@loopback/repository';

@model()
export class RecorridoSolicitud extends Model {
  @property({
    type: 'number',
    required: true,
  })
  barrioOrigenId: number;

  @property({
    type: 'number',
    required: true,
  })
  barrioDestinoId: number;

  @property({
    type: 'string',
    required: true,
  })
  conductorId: string;


  constructor(data?: Partial<RecorridoSolicitud>) {
    super(data);
  }
}

export interface RecorridoSolicitudRelations {
  // describe navigational properties here
}

export type RecorridoSolicitudWithRelations = RecorridoSolicitud & RecorridoSolicitudRelations;
