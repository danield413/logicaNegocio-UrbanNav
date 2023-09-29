import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JustificacionConductor, JustificacionConductorRelations, Conductor, Administrador} from '../models';
import {ConductorRepository} from './conductor.repository';
import {AdministradorRepository} from './administrador.repository';

export class JustificacionConductorRepository extends DefaultCrudRepository<
  JustificacionConductor,
  typeof JustificacionConductor.prototype.idJustificacion,
  JustificacionConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof JustificacionConductor.prototype.idJustificacion>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof JustificacionConductor.prototype.idJustificacion>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(JustificacionConductor, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
