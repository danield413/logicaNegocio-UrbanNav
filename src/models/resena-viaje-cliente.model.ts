import {Entity, belongsTo, model, property, hasOne} from '@loopback/repository';
import {Viaje} from './viaje.model';
import {PuntuacionCliente} from './puntuacion-cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_resena_viaje_cliente_viajeid: {
        name: 'fk_resena_viaje_cliente_viajeid',
        entity: 'Viaje',
        entityKey: 'idViaje',
        foreignKey: 'viajeId',
      },
    },
  },
})
export class ResenaViajeCliente extends Entity {
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

  @belongsTo(() => Viaje)
  viajeId: number;

  @hasOne(() => PuntuacionCliente)
  puntuacionCliente: PuntuacionCliente;

  constructor(data?: Partial<ResenaViajeCliente>) {
    super(data);
  }
}

export interface ResenaViajeClienteRelations {
  // describe navigational properties here
}

export type ResenaViajeClienteWithRelations = ResenaViajeCliente & ResenaViajeClienteRelations;
