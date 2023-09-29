import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResenaViajeConductor, ResenaViajeConductorRelations, Viaje, PuntuacionConductor} from '../models';
import {ViajeRepository} from './viaje.repository';
import {PuntuacionConductorRepository} from './puntuacion-conductor.repository';

export class ResenaViajeConductorRepository extends DefaultCrudRepository<
  ResenaViajeConductor,
  typeof ResenaViajeConductor.prototype.idResena,
  ResenaViajeConductorRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof ResenaViajeConductor.prototype.idResena>;

  public readonly puntuacionConductor: HasOneRepositoryFactory<PuntuacionConductor, typeof ResenaViajeConductor.prototype.idResena>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('PuntuacionConductorRepository') protected puntuacionConductorRepositoryGetter: Getter<PuntuacionConductorRepository>,
  ) {
    super(ResenaViajeConductor, dataSource);
    this.puntuacionConductor = this.createHasOneRepositoryFactoryFor('puntuacionConductor', puntuacionConductorRepositoryGetter);
    this.registerInclusionResolver('puntuacionConductor', this.puntuacionConductor.inclusionResolver);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
