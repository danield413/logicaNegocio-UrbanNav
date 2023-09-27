import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Preferencia, PreferenciaRelations} from '../models';

export class PreferenciaRepository extends DefaultCrudRepository<
  Preferencia,
  typeof Preferencia.prototype.idPreferencia,
  PreferenciaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Preferencia, dataSource);
  }
}
