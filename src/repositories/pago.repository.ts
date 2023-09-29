import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pago, PagoRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.idPago,
  PagoRelations
> {

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Pago.prototype.idPago>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Pago, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
