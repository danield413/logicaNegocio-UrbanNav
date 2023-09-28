import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Alerta, AlertaRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class AlertaRepository extends DefaultCrudRepository<
  Alerta,
  typeof Alerta.prototype.idAlerta,
  AlertaRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof Alerta.prototype.idAlerta>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(Alerta, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
