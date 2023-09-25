import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Pago, Viaje} from '../models';
import {PagoRepository} from './pago.repository';
import {ViajeRepository} from './viaje.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.idFactura,
  FacturaRelations
> {

  public readonly pago: HasOneRepositoryFactory<Pago, typeof Factura.prototype.idFactura>;

  public readonly viaje: BelongsToAccessor<Viaje, typeof Factura.prototype.idFactura>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(Factura, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.pago = this.createHasOneRepositoryFactoryFor('pago', pagoRepositoryGetter);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
  }
}
