import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pago, PagoRelations, MetodoPago, Factura} from '../models';
import {MetodoPagoRepository} from './metodo-pago.repository';
import {FacturaRepository} from './factura.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.idPago,
  PagoRelations
> {

  public readonly metodoPago: HasOneRepositoryFactory<MetodoPago, typeof Pago.prototype.idPago>;

  public readonly factura: BelongsToAccessor<Factura, typeof Pago.prototype.idPago>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Pago, dataSource);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.metodoPago = this.createHasOneRepositoryFactoryFor('metodoPago', metodoPagoRepositoryGetter);
    this.registerInclusionResolver('metodoPago', this.metodoPago.inclusionResolver);
  }
}
