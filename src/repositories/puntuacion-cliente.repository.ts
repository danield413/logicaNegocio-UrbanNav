import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuntuacionCliente, PuntuacionClienteRelations} from '../models';

export class PuntuacionClienteRepository extends DefaultCrudRepository<
  PuntuacionCliente,
  typeof PuntuacionCliente.prototype.idPuntuacion,
  PuntuacionClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PuntuacionCliente, dataSource);
  }
}
