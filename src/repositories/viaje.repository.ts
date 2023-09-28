import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Alerta, Cliente, Conductor, Factura, Viaje, ViajeRelations} from '../models';
import {AlertaRepository} from './alerta.repository';
import {ClienteRepository} from './cliente.repository';
import {ConductorRepository} from './conductor.repository';
import {FacturaRepository} from './factura.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.idViaje,
  ViajeRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof Viaje.prototype.idViaje>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Viaje.prototype.idViaje>;

  public readonly alerta: HasOneRepositoryFactory<Alerta, typeof Viaje.prototype.idViaje>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Viaje.prototype.idViaje>;


  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AlertaRepository') protected alertaRepositoryGetter: Getter<AlertaRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Viaje, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.alerta = this.createHasOneRepositoryFactoryFor('alerta', alertaRepositoryGetter);
    this.registerInclusionResolver('alerta', this.alerta.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
