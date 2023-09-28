import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.idVehiculo,
  VehiculoRelations
> {

  public readonly conductor: HasOneRepositoryFactory<Conductor, typeof Vehiculo.prototype.idVehiculo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.conductor = this.createHasOneRepositoryFactoryFor('conductor', conductorRepositoryGetter);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
