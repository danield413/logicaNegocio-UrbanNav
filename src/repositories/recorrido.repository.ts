import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recorrido, RecorridoRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class RecorridoRepository extends DefaultCrudRepository<
  Recorrido,
  typeof Recorrido.prototype.idRecorrido,
  RecorridoRelations
> {

  public readonly viaje: HasOneRepositoryFactory<Viaje, typeof Recorrido.prototype.idRecorrido>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(Recorrido, dataSource);
    this.viaje = this.createHasOneRepositoryFactoryFor('viaje', viajeRepositoryGetter);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
