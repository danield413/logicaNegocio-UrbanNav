import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recorrido, RecorridoRelations, Viaje, Barrio} from '../models';
import {ViajeRepository} from './viaje.repository';
import {BarrioRepository} from './barrio.repository';

export class RecorridoRepository extends DefaultCrudRepository<
  Recorrido,
  typeof Recorrido.prototype.idRecorrido,
  RecorridoRelations
> {

  public readonly viajes: HasManyRepositoryFactory<Viaje, typeof Recorrido.prototype.idRecorrido>;

  public readonly barrioOrigen: BelongsToAccessor<Barrio, typeof Recorrido.prototype.idRecorrido>;

  public readonly barrioDestino: BelongsToAccessor<Barrio, typeof Recorrido.prototype.idRecorrido>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('BarrioRepository') protected barrioRepositoryGetter: Getter<BarrioRepository>,
  ) {
    super(Recorrido, dataSource);
    this.barrioDestino = this.createBelongsToAccessorFor('barrioDestino', barrioRepositoryGetter,);
    this.registerInclusionResolver('barrioDestino', this.barrioDestino.inclusionResolver);
    this.barrioOrigen = this.createBelongsToAccessorFor('barrioOrigen', barrioRepositoryGetter,);
    this.registerInclusionResolver('barrioOrigen', this.barrioOrigen.inclusionResolver);
    this.viajes = this.createHasManyRepositoryFactoryFor('viajes', viajeRepositoryGetter,);
    this.registerInclusionResolver('viajes', this.viajes.inclusionResolver);
  }
}
