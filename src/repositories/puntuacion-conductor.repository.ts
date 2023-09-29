import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuntuacionConductor, PuntuacionConductorRelations, ResenaViajeConductor} from '../models';
import {ResenaViajeConductorRepository} from './resena-viaje-conductor.repository';

export class PuntuacionConductorRepository extends DefaultCrudRepository<
  PuntuacionConductor,
  typeof PuntuacionConductor.prototype.idPuntuacion,
  PuntuacionConductorRelations
> {

  public readonly resenaViajeConductor: BelongsToAccessor<ResenaViajeConductor, typeof PuntuacionConductor.prototype.idPuntuacion>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResenaViajeConductorRepository') protected resenaViajeConductorRepositoryGetter: Getter<ResenaViajeConductorRepository>,
  ) {
    super(PuntuacionConductor, dataSource);
    this.resenaViajeConductor = this.createBelongsToAccessorFor('resenaViajeConductor', resenaViajeConductorRepositoryGetter,);
    this.registerInclusionResolver('resenaViajeConductor', this.resenaViajeConductor.inclusionResolver);
  }
}
