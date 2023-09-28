import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Preferencia, Viaje, JustificacionCliente} from '../models';
import {PreferenciaRepository} from './preferencia.repository';
import {ViajeRepository} from './viaje.repository';
import {JustificacionClienteRepository} from './justificacion-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.idCliente,
  ClienteRelations
> {

  public readonly preferencias: HasManyRepositoryFactory<Preferencia, typeof Cliente.prototype.idCliente>;

  public readonly viajes: HasManyRepositoryFactory<Viaje, typeof Cliente.prototype.idCliente>;

  public readonly justificacionClientes: HasManyRepositoryFactory<JustificacionCliente, typeof Cliente.prototype.idCliente>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PreferenciaRepository') protected preferenciaRepositoryGetter: Getter<PreferenciaRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('JustificacionClienteRepository') protected justificacionClienteRepositoryGetter: Getter<JustificacionClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.justificacionClientes = this.createHasManyRepositoryFactoryFor('justificacionClientes', justificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('justificacionClientes', this.justificacionClientes.inclusionResolver);
    this.viajes = this.createHasManyRepositoryFactoryFor('viajes', viajeRepositoryGetter,);
    this.registerInclusionResolver('viajes', this.viajes.inclusionResolver);
    this.preferencias = this.createHasManyRepositoryFactoryFor('preferencias', preferenciaRepositoryGetter,);
    this.registerInclusionResolver('preferencias', this.preferencias.inclusionResolver);
  }
}
