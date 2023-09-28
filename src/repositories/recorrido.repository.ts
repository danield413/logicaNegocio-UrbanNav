import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recorrido, RecorridoRelations} from '../models';

export class RecorridoRepository extends DefaultCrudRepository<
  Recorrido,
  typeof Recorrido.prototype.idRecorrido,
  RecorridoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Recorrido, dataSource);
  }
}
