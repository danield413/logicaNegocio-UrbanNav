import {Entity, model, property} from '@loopback/repository';

@model()
export class Conductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idConductor?: number;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
  })
  urlFoto?: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  documentoIdentidad: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoServicio: string;

  @property({
    type: 'string',
  })
  idMongoDB?: string;


  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;