import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResenaViajeCliente, ResenaViajeClienteRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class ResenaViajeClienteRepository extends DefaultCrudRepository<
  ResenaViajeCliente,
  typeof ResenaViajeCliente.prototype.idResena,
  ResenaViajeClienteRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof ResenaViajeCliente.prototype.idResena>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(ResenaViajeCliente, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
