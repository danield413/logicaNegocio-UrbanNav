import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResenaViajeConductor, ResenaViajeConductorRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class ResenaViajeConductorRepository extends DefaultCrudRepository<
  ResenaViajeConductor,
  typeof ResenaViajeConductor.prototype.idResena,
  ResenaViajeConductorRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof ResenaViajeConductor.prototype.idResena>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(ResenaViajeConductor, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
