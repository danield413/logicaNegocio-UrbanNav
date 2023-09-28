import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JustificacionCliente, JustificacionClienteRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class JustificacionClienteRepository extends DefaultCrudRepository<
  JustificacionCliente,
  typeof JustificacionCliente.prototype.idJustificacion,
  JustificacionClienteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof JustificacionCliente.prototype.idJustificacion>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(JustificacionCliente, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
