import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Barrio, BarrioRelations, Ciudad, Recorrido} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {RecorridoRepository} from './recorrido.repository';

export class BarrioRepository extends DefaultCrudRepository<
  Barrio,
  typeof Barrio.prototype.idBarrio,
  BarrioRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Barrio.prototype.idBarrio>;

  public readonly recorridosOrigen: HasManyRepositoryFactory<Recorrido, typeof Barrio.prototype.idBarrio>;

  public readonly recorridosDestino: HasManyRepositoryFactory<Recorrido, typeof Barrio.prototype.idBarrio>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('RecorridoRepository') protected recorridoRepositoryGetter: Getter<RecorridoRepository>,
  ) {
    super(Barrio, dataSource);
    this.recorridosDestino = this.createHasManyRepositoryFactoryFor('recorridosDestino', recorridoRepositoryGetter,);
    this.registerInclusionResolver('recorridosDestino', this.recorridosDestino.inclusionResolver);
    this.recorridosOrigen = this.createHasManyRepositoryFactoryFor('recorridosOrigen', recorridoRepositoryGetter,);
    this.registerInclusionResolver('recorridosOrigen', this.recorridosOrigen.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
