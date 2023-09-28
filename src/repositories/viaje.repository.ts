import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Viaje, ViajeRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.idViaje,
  ViajeRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof Viaje.prototype.idViaje>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(Viaje, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
