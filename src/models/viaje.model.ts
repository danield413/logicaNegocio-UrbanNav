import {Entity, model, property, hasOne} from '@loopback/repository';
import {Alerta} from './alerta.model';
import {Factura} from './factura.model';

@model()
export class Viaje extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idViaje?: number;

  @property({
    type: 'string',
    required: true,
  })
  estadoViaje: string;

  @property({
    type: 'string',
    required: true,
  })
  fechahoraInicio: string;

  @property({
    type: 'string',
  })
  fechahoraFin?: string;

  @hasOne(() => Alerta)
  alerta: Alerta;

  @hasOne(() => Factura)
  factura: Factura;

  constructor(data?: Partial<Viaje>) {
    super(data);
  }
}

export interface ViajeRelations {
  // describe navigational properties here
}

export type ViajeWithRelations = Viaje & ViajeRelations;
