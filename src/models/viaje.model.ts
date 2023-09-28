import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {Alerta} from './alerta.model';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';
import {Factura} from './factura.model';
import {Recorrido} from './recorrido.model';

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
      fkRecorridoId: {
        name: 'fk_viaje_recorridoid',
        entity: 'Recorrido',
        entityKey: 'idRecorrido',
        foreignKey: 'recorridoId',
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

  @hasOne(() => Alerta)
  alerta: Alerta;

  @hasOne(() => Factura)
  factura: Factura;

  @belongsTo(() => Recorrido)
  recorridoId: number;

  constructor(data?: Partial<Viaje>) {
    super(data);
  }
}

export interface ViajeRelations {
  // describe navigational properties here
}

export type ViajeWithRelations = Viaje & ViajeRelations;
