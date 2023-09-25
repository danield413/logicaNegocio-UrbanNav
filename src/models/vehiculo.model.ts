import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fkVehiculoConductor: {
        name: 'fkVehiculoConductor',
        entity: 'Conductor',
        entityKey: 'idConductor',
        foreignKey: 'conductorId',
      },
    },
  },
})
export class Vehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idVehiculo?: number;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  soat: string;

  @property({
    type: 'string',
    required: true,
  })
  tecno: string;

  @belongsTo(() => Conductor)
  conductorId: number;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
