import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Viaje, ViajeRelations, Conductor, Cliente, Alerta, Factura, Recorrido} from '../models';
import {ConductorRepository} from './conductor.repository';
import {ClienteRepository} from './cliente.repository';
import {AlertaRepository} from './alerta.repository';
import {FacturaRepository} from './factura.repository';
import {RecorridoRepository} from './recorrido.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.idViaje,
  ViajeRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof Viaje.prototype.idViaje>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Viaje.prototype.idViaje>;

  public readonly alerta: HasOneRepositoryFactory<Alerta, typeof Viaje.prototype.idViaje>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Viaje.prototype.idViaje>;

  public readonly recorrido: BelongsToAccessor<Recorrido, typeof Viaje.prototype.idViaje>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AlertaRepository') protected alertaRepositoryGetter: Getter<AlertaRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('RecorridoRepository') protected recorridoRepositoryGetter: Getter<RecorridoRepository>,
  ) {
    super(Viaje, dataSource);
    this.recorrido = this.createBelongsToAccessorFor('recorrido', recorridoRepositoryGetter,);
    this.registerInclusionResolver('recorrido', this.recorrido.inclusionResolver);
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
