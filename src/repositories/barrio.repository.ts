import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Barrio, BarrioRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class BarrioRepository extends DefaultCrudRepository<
  Barrio,
  typeof Barrio.prototype.idBarrio,
  BarrioRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Barrio.prototype.idBarrio>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Barrio, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
