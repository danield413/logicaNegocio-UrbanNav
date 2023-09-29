import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Administrador, AdministradorRelations, JustificacionCliente, JustificacionConductor} from '../models';
import {JustificacionClienteRepository} from './justificacion-cliente.repository';
import {JustificacionConductorRepository} from './justificacion-conductor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.idAdministrador,
  AdministradorRelations
> {

  public readonly justificacionClientes: HasManyRepositoryFactory<JustificacionCliente, typeof Administrador.prototype.idAdministrador>;

  public readonly justificacionConductors: HasManyRepositoryFactory<JustificacionConductor, typeof Administrador.prototype.idAdministrador>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JustificacionClienteRepository') protected justificacionClienteRepositoryGetter: Getter<JustificacionClienteRepository>, @repository.getter('JustificacionConductorRepository') protected justificacionConductorRepositoryGetter: Getter<JustificacionConductorRepository>,
  ) {
    super(Administrador, dataSource);
    this.justificacionConductors = this.createHasManyRepositoryFactoryFor('justificacionConductors', justificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('justificacionConductors', this.justificacionConductors.inclusionResolver);
    this.justificacionClientes = this.createHasManyRepositoryFactoryFor('justificacionClientes', justificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('justificacionClientes', this.justificacionClientes.inclusionResolver);
  }
}
