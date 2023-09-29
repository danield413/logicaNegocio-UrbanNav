import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Barrio} from '../models';
import {BarrioRepository} from './barrio.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.idCiudad,
  CiudadRelations
> {

  public readonly barrios: HasManyRepositoryFactory<Barrio, typeof Ciudad.prototype.idCiudad>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BarrioRepository') protected barrioRepositoryGetter: Getter<BarrioRepository>,
  ) {
    super(Ciudad, dataSource);
    this.barrios = this.createHasManyRepositoryFactoryFor('barrios', barrioRepositoryGetter,);
    this.registerInclusionResolver('barrios', this.barrios.inclusionResolver);
  }
}
