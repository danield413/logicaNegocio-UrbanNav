import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuntuacionCliente, PuntuacionClienteRelations, ResenaViajeCliente} from '../models';
import {ResenaViajeClienteRepository} from './resena-viaje-cliente.repository';

export class PuntuacionClienteRepository extends DefaultCrudRepository<
  PuntuacionCliente,
  typeof PuntuacionCliente.prototype.idPuntuacion,
  PuntuacionClienteRelations
> {

  public readonly resenaViajeCliente: BelongsToAccessor<ResenaViajeCliente, typeof PuntuacionCliente.prototype.idPuntuacion>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResenaViajeClienteRepository') protected resenaViajeClienteRepositoryGetter: Getter<ResenaViajeClienteRepository>,
  ) {
    super(PuntuacionCliente, dataSource);
    this.resenaViajeCliente = this.createBelongsToAccessorFor('resenaViajeCliente', resenaViajeClienteRepositoryGetter,);
    this.registerInclusionResolver('resenaViajeCliente', this.resenaViajeCliente.inclusionResolver);
  }
}
