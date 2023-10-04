import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, ConductorRelations, Vehiculo, Viaje, JustificacionConductor, Barrio} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {ViajeRepository} from './viaje.repository';
import {JustificacionConductorRepository} from './justificacion-conductor.repository';
import {BarrioRepository} from './barrio.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.idConductor,
  ConductorRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Conductor.prototype.idConductor>;

  public readonly viajes: HasManyRepositoryFactory<Viaje, typeof Conductor.prototype.idConductor>;

  public readonly justificacionConductors: HasManyRepositoryFactory<JustificacionConductor, typeof Conductor.prototype.idConductor>;

  public readonly barrio: BelongsToAccessor<Barrio, typeof Conductor.prototype.idConductor>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('JustificacionConductorRepository') protected justificacionConductorRepositoryGetter: Getter<JustificacionConductorRepository>, @repository.getter('BarrioRepository') protected barrioRepositoryGetter: Getter<BarrioRepository>,
  ) {
    super(Conductor, dataSource);
    this.barrio = this.createBelongsToAccessorFor('barrio', barrioRepositoryGetter,);
    this.registerInclusionResolver('barrio', this.barrio.inclusionResolver);
    this.justificacionConductors = this.createHasManyRepositoryFactoryFor('justificacionConductors', justificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('justificacionConductors', this.justificacionConductors.inclusionResolver);
    this.viajes = this.createHasManyRepositoryFactoryFor('viajes', viajeRepositoryGetter,);
    this.registerInclusionResolver('viajes', this.viajes.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
