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
import {ResenaViajeConductor} from '../models';
import {ResenaViajeConductorRepository, ViajeRepository} from '../repositories';
import {LogicaServicioService} from '../services';

export class ResenaViajeConductorController {
  constructor(
    @repository(ResenaViajeConductorRepository)
    public resenaViajeConductorRepository: ResenaViajeConductorRepository,
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
    @service(LogicaServicioService)
    public LogicaServicio: LogicaServicioService,
  ) {}

  @post('/resena-viaje-conductor')
  @response(200, {
    description: 'ResenaViajeConductor model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(ResenaViajeConductor)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeConductor, {
            title: 'NewResenaViajeConductor',
            exclude: ['idResena'],
          }),
        },
      },
    })
    resenaViajeConductor: Omit<ResenaViajeConductor, 'idResena'>,
  ): Promise<ResenaViajeConductor> {
    return this.resenaViajeConductorRepository.create(resenaViajeConductor);
  }

  @get('/resena-viaje-conductor/count')
  @response(200, {
    description: 'ResenaViajeConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResenaViajeConductor) where?: Where<ResenaViajeConductor>,
  ): Promise<Count> {
    return this.resenaViajeConductorRepository.count(where);
  }

  @get('/resena-viaje-conductor')
  @response(200, {
    description: 'Array of ResenaViajeConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResenaViajeConductor, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(ResenaViajeConductor) filter?: Filter<ResenaViajeConductor>,
  ): Promise<ResenaViajeConductor[]> {
    return this.resenaViajeConductorRepository.find({
      include: [
        {
          relation: 'viaje',
          scope: {
            include: [
              {
                relation: 'conductor', // Asumiendo que hay una relación llamada 'conductor' en tu modelo 'Viaje'
              },
            ],
          },
        },
        {
          relation: 'puntuacionConductor',
        },
      ],
    });
  }

  @patch('/resena-viaje-conductor')
  @response(200, {
    description: 'ResenaViajeConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeConductor, {partial: true}),
        },
      },
    })
    resenaViajeConductor: ResenaViajeConductor,
    @param.where(ResenaViajeConductor) where?: Where<ResenaViajeConductor>,
  ): Promise<Count> {
    return this.resenaViajeConductorRepository.updateAll(
      resenaViajeConductor,
      where,
    );
  }

  @get('/resena-viaje-conductor/{id}')
  @response(200, {
    description: 'ResenaViajeConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResenaViajeConductor, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResenaViajeConductor, {exclude: 'where'})
    filter?: FilterExcludingWhere<ResenaViajeConductor>,
  ): Promise<ResenaViajeConductor> {
    return this.resenaViajeConductorRepository.findById(id, filter);
  }

  @get('/resenas-viaje-conductor/{idConductor}')
  @response(200, {
    description: 'Array of ResenaViajeConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResenaViajeConductor, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async findByIdResenaAConductor(
    @param.path.number('idConductor') id: number,
  ): Promise<any[]> {
    let resenas: any = await this.resenaViajeConductorRepository.find();
    console.log(resenas);
    let resenasConductor = resenas.map(async (resena: ResenaViajeConductor) => {
      let viaje = await this.viajeRepository.findById(resena.viajeId);
      if (viaje.conductorId === id) {
        let puntuacion = await this.LogicaServicio.puntuacionResenasConductor(
          resena.idResena!,
        );
        return {
          resena,
          puntuacion,
        };
      }
    });
    return Promise.all(resenasConductor);
  }

  @patch('/resena-viaje-conductor/{id}')
  @response(204, {
    description: 'ResenaViajeConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResenaViajeConductor, {partial: true}),
        },
      },
    })
    resenaViajeConductor: ResenaViajeConductor,
  ): Promise<void> {
    await this.resenaViajeConductorRepository.updateById(
      id,
      resenaViajeConductor,
    );
  }

  @put('/resena-viaje-conductor/{id}')
  @response(204, {
    description: 'ResenaViajeConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resenaViajeConductor: ResenaViajeConductor,
  ): Promise<void> {
    await this.resenaViajeConductorRepository.replaceById(
      id,
      resenaViajeConductor,
    );
  }

  @del('/resena-viaje-conductor/{id}')
  @response(204, {
    description: 'ResenaViajeConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resenaViajeConductorRepository.deleteById(id);
  }
}
