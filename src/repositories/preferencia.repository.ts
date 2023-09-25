import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Preferencia, PreferenciaRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PreferenciaRepository extends DefaultCrudRepository<
  Preferencia,
  typeof Preferencia.prototype.idPreferencia,
  PreferenciaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Preferencia.prototype.idPreferencia>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Preferencia, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
