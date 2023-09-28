import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fkClienteId: {
        name: 'fk_cliente_preferencia_id',
        entity: 'Cliente',
        entityKey: 'idCliente',
        foreignKey: 'clienteId',
      },
    },
  },
})
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

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Preferencia>) {
    super(data);
  }
}

export interface PreferenciaRelations {
  // describe navigational properties here
}

export type PreferenciaWithRelations = Preferencia & PreferenciaRelations;
