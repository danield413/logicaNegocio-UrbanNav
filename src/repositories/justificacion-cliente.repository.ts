import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JustificacionCliente, JustificacionClienteRelations} from '../models';

export class JustificacionClienteRepository extends DefaultCrudRepository<
  JustificacionCliente,
  typeof JustificacionCliente.prototype.idJustificacion,
  JustificacionClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(JustificacionCliente, dataSource);
  }
}
