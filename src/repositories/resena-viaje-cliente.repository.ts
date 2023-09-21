import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResenaViajeCliente, ResenaViajeClienteRelations} from '../models';

export class ResenaViajeClienteRepository extends DefaultCrudRepository<
  ResenaViajeCliente,
  typeof ResenaViajeCliente.prototype.idResena,
  ResenaViajeClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ResenaViajeCliente, dataSource);
  }
}
