import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JustificacionCliente, JustificacionClienteRelations, Cliente, Administrador} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AdministradorRepository} from './administrador.repository';

export class JustificacionClienteRepository extends DefaultCrudRepository<
  JustificacionCliente,
  typeof JustificacionCliente.prototype.idJustificacion,
  JustificacionClienteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof JustificacionCliente.prototype.idJustificacion>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof JustificacionCliente.prototype.idJustificacion>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(JustificacionCliente, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
