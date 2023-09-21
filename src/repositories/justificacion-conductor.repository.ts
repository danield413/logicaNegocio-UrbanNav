import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JustificacionConductor, JustificacionConductorRelations} from '../models';

export class JustificacionConductorRepository extends DefaultCrudRepository<
  JustificacionConductor,
  typeof JustificacionConductor.prototype.idJustificacion,
  JustificacionConductorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(JustificacionConductor, dataSource);
  }
}
