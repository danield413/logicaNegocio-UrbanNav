import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fkConductorId: {
        name: 'fk_viaje_conductorid',
        entity: 'Conductor',
        entityKey: 'idConductor',
        foreignKey: 'conductorId',
      },
      fkClienteId: {
        name: 'fk_viaje_clienteid',
        entity: 'Cliente',
        entityKey: 'idCliente',
        foreignKey: 'clienteId',
      },
    },
  },
})
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

  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Viaje>) {
    super(data);
  }
}

export interface ViajeRelations {
  // describe navigational properties here
}

export type ViajeWithRelations = Viaje & ViajeRelations;
