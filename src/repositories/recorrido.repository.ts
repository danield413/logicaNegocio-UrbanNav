import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recorrido, RecorridoRelations} from '../models';
import {ViajeRepository} from './viaje.repository';

export class RecorridoRepository extends DefaultCrudRepository<
  Recorrido,
  typeof Recorrido.prototype.idRecorrido,
  RecorridoRelations
> {


  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(Recorrido, dataSource);
  }
}
