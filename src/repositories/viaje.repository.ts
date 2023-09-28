import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Viaje, ViajeRelations, Conductor, Cliente, Alerta, Factura, Recorrido, ResenaViajeCliente, ResenaViajeConductor} from '../models';
import {ConductorRepository} from './conductor.repository';
import {ClienteRepository} from './cliente.repository';
import {AlertaRepository} from './alerta.repository';
import {FacturaRepository} from './factura.repository';
import {RecorridoRepository} from './recorrido.repository';
import {ResenaViajeClienteRepository} from './resena-viaje-cliente.repository';
import {ResenaViajeConductorRepository} from './resena-viaje-conductor.repository';

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

  public readonly resenaViajeCliente: HasOneRepositoryFactory<ResenaViajeCliente, typeof Viaje.prototype.idViaje>;

  public readonly resenaViajeConductor: HasOneRepositoryFactory<ResenaViajeConductor, typeof Viaje.prototype.idViaje>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AlertaRepository') protected alertaRepositoryGetter: Getter<AlertaRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('RecorridoRepository') protected recorridoRepositoryGetter: Getter<RecorridoRepository>, @repository.getter('ResenaViajeClienteRepository') protected resenaViajeClienteRepositoryGetter: Getter<ResenaViajeClienteRepository>, @repository.getter('ResenaViajeConductorRepository') protected resenaViajeConductorRepositoryGetter: Getter<ResenaViajeConductorRepository>,
  ) {
    super(Viaje, dataSource);
    this.resenaViajeConductor = this.createHasOneRepositoryFactoryFor('resenaViajeConductor', resenaViajeConductorRepositoryGetter);
    this.registerInclusionResolver('resenaViajeConductor', this.resenaViajeConductor.inclusionResolver);
    this.resenaViajeCliente = this.createHasOneRepositoryFactoryFor('resenaViajeCliente', resenaViajeClienteRepositoryGetter);
    this.registerInclusionResolver('resenaViajeCliente', this.resenaViajeCliente.inclusionResolver);
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
