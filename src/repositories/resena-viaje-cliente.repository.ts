import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResenaViajeCliente, ResenaViajeClienteRelations, Viaje, PuntuacionCliente} from '../models';
import {ViajeRepository} from './viaje.repository';
import {PuntuacionClienteRepository} from './puntuacion-cliente.repository';

export class ResenaViajeClienteRepository extends DefaultCrudRepository<
  ResenaViajeCliente,
  typeof ResenaViajeCliente.prototype.idResena,
  ResenaViajeClienteRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof ResenaViajeCliente.prototype.idResena>;

  public readonly puntuacionCliente: HasOneRepositoryFactory<PuntuacionCliente, typeof ResenaViajeCliente.prototype.idResena>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('PuntuacionClienteRepository') protected puntuacionClienteRepositoryGetter: Getter<PuntuacionClienteRepository>,
  ) {
    super(ResenaViajeCliente, dataSource);
    this.puntuacionCliente = this.createHasOneRepositoryFactoryFor('puntuacionCliente', puntuacionClienteRepositoryGetter);
    this.registerInclusionResolver('puntuacionCliente', this.puntuacionCliente.inclusionResolver);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
