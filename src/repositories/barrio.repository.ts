import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Barrio, BarrioRelations} from '../models';

export class BarrioRepository extends DefaultCrudRepository<
  Barrio,
  typeof Barrio.prototype.idBarrio,
  BarrioRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Barrio, dataSource);
  }
}
