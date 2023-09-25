import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Viaje, ViajeRelations, Alerta} from '../models';
import {AlertaRepository} from './alerta.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.idViaje,
  ViajeRelations
> {

  public readonly alerta: HasOneRepositoryFactory<Alerta, typeof Viaje.prototype.idViaje>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AlertaRepository') protected alertaRepositoryGetter: Getter<AlertaRepository>,
  ) {
    super(Viaje, dataSource);
    this.alerta = this.createHasOneRepositoryFactoryFor('alerta', alertaRepositoryGetter);
    this.registerInclusionResolver('alerta', this.alerta.inclusionResolver);
  }
}
