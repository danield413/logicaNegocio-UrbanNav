import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Viaje, ViajeRelations, Alerta, Factura} from '../models';
import {AlertaRepository} from './alerta.repository';
import {FacturaRepository} from './factura.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.idViaje,
  ViajeRelations
> {

  public readonly alerta: HasOneRepositoryFactory<Alerta, typeof Viaje.prototype.idViaje>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Viaje.prototype.idViaje>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AlertaRepository') protected alertaRepositoryGetter: Getter<AlertaRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Viaje, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.alerta = this.createHasOneRepositoryFactoryFor('alerta', alertaRepositoryGetter);
    this.registerInclusionResolver('alerta', this.alerta.inclusionResolver);
  }
}
