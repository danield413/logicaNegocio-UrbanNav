import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fkClienteId: {
        name: 'fk_cliente_id',
        entity: 'Cliente',
        entityKey: 'idCliente',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class JustificacionCliente extends Entity {
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

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<JustificacionCliente>) {
    super(data);
  }
}

export interface JustificacionClienteRelations {
  // describe navigational properties here
}

export type JustificacionClienteWithRelations = JustificacionCliente &
  JustificacionClienteRelations;
