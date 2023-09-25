import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Preferencia} from '../models';
import {PreferenciaRepository} from './preferencia.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.idCliente,
  ClienteRelations
> {

  public readonly preferencias: HasManyRepositoryFactory<Preferencia, typeof Cliente.prototype.idCliente>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PreferenciaRepository') protected preferenciaRepositoryGetter: Getter<PreferenciaRepository>,
  ) {
    super(Cliente, dataSource);
    this.preferencias = this.createHasManyRepositoryFactoryFor('preferencias', preferenciaRepositoryGetter,);
    this.registerInclusionResolver('preferencias', this.preferencias.inclusionResolver);
  }
}
