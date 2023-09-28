import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JustificacionConductor, JustificacionConductorRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class JustificacionConductorRepository extends DefaultCrudRepository<
  JustificacionConductor,
  typeof JustificacionConductor.prototype.idJustificacion,
  JustificacionConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof JustificacionConductor.prototype.idJustificacion>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(JustificacionConductor, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
