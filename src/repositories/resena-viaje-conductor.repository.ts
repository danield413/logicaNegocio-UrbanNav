import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResenaViajeConductor, ResenaViajeConductorRelations} from '../models';

export class ResenaViajeConductorRepository extends DefaultCrudRepository<
  ResenaViajeConductor,
  typeof ResenaViajeConductor.prototype.idResena,
  ResenaViajeConductorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ResenaViajeConductor, dataSource);
  }
}
