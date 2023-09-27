import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuntuacionConductor, PuntuacionConductorRelations} from '../models';

export class PuntuacionConductorRepository extends DefaultCrudRepository<
  PuntuacionConductor,
  typeof PuntuacionConductor.prototype.idPuntuacion,
  PuntuacionConductorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PuntuacionConductor, dataSource);
  }
}
