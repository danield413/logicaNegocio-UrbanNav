import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Viaje, Pago} from '../models';
import {ViajeRepository} from './viaje.repository';
import {PagoRepository} from './pago.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.idFactura,
  FacturaRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof Factura.prototype.idFactura>;

  public readonly pago: BelongsToAccessor<Pago, typeof Factura.prototype.idFactura>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Factura, dataSource);
    this.pago = this.createBelongsToAccessorFor('pago', pagoRepositoryGetter,);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
