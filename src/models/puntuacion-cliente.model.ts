import {Entity, belongsTo, model, property} from '@loopback/repository';
import {ResenaViajeCliente} from './resena-viaje-cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_resena_clienteid: {
        name: 'fk_resena_clienteid',
        entity: 'ResenaViajeCliente',
        entityKey: 'idResena',
        foreignKey: 'resenaViajeClienteId',
      },
    },
  },
})
export class PuntuacionCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPuntuacion?: number;

  @property({
    type: 'number',
  })
  puntuacion?: number;

  @belongsTo(() => ResenaViajeCliente)
  resenaViajeClienteId: number;

  constructor(data?: Partial<PuntuacionCliente>) {
    super(data);
  }
}

export interface PuntuacionClienteRelations {
  // describe navigational properties here
}

export type PuntuacionWithRelations = PuntuacionCliente &
  PuntuacionClienteRelations;
