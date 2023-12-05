import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Conductor} from '../models';
import {ConductorRepository, PuntuacionConductorRepository, ResenaViajeConductorRepository, ViajeRepository} from '../repositories';
import {LogicaServicioService} from '../services';

export class ConductorController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @repository(PuntuacionConductorRepository)
    public puntuacionConductorRepository: PuntuacionConductorRepository,
    @repository(ViajeRepository)
    public conductorViajeRepository: ViajeRepository,
    @repository(ResenaViajeConductorRepository)
    public resenaViajeConductorRepository: ResenaViajeConductorRepository,
    @service(LogicaServicioService)
    public logicaServicioService: LogicaServicioService,
  ) { }

  @post('/conductor')
  @response(200, {
    description: 'Conductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductor',
            exclude: ['idConductor'],
          }),
        },
      },
    })
    conductor: Omit<Conductor, 'idConductor'>,
  ): Promise<Conductor> {
    return this.conductorRepository.create(conductor);
  }

  @get('/conductor/count')
  @response(200, {
    description: 'Conductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Conductor) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.conductorRepository.count(where);
  }

  @get('/conductor')
  @response(200, {
    description: 'Array of Conductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Conductor) filter?: Filter<Conductor>,
  ): Promise<Conductor[]> {
    return this.conductorRepository.find(filter);
  }

  @patch('/conductor')
  @response(200, {
    description: 'Conductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Conductor,
    @param.where(Conductor) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.conductorRepository.updateAll(conductor, where);
  }

  @get('/conductor/{id}')
  @response(200, {
    description: 'Conductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Conductor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Conductor>,
  ): Promise<Conductor> {
    return this.conductorRepository.findById(id, filter);
  }


  @get('/promedio-conductor/{id}')
  @response(200, {
    description: 'Conductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conductor, {includeRelations: true}),
      },
    },
  })
  async findPromedioById(
    @param.path.number('id') id: number,
    @param.filter(Conductor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Conductor>,
  ): Promise<any> {
    let promedio = await this.logicaServicioService.promedioConductor(id);
    return promedio;
  }

  @patch('/conductor/{id}')
  @response(204, {
    description: 'Conductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Conductor,
  ): Promise<void> {
    await this.conductorRepository.updateById(id, conductor);
  }

  @get('/conductor/mongo/{idMongo}')
  @response(200, {
    description: 'Conductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conductor, {includeRelations: true}),
      },
    },
  })
  async findByMongoID(
    @param.path.string('idMongo') id: string,
    @param.filter(Conductor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Conductor>,
  ): Promise<Conductor | undefined> {
    //search the usuario with the idMongo
    const conductor = await this.conductorRepository.findOne({
      where: {idMongoDB: id},
    });
    console.log(conductor);
    if (conductor) return conductor;
  }

  @put('/conductor/{id}')
  @response(204, {
    description: 'Conductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() conductor: Conductor,
  ): Promise<void> {
    await this.conductorRepository.replaceById(id, conductor);
  }

  @del('/conductor/{id}')
  @response(204, {
    description: 'Conductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.conductorRepository.deleteById(id);
  }
}
