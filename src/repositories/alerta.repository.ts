import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Alerta, AlertaRelations} from '../models';

export class AlertaRepository extends DefaultCrudRepository<
  Alerta,
  typeof Alerta.prototype.idAlerta,
  AlertaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Alerta, dataSource);
  }
}
