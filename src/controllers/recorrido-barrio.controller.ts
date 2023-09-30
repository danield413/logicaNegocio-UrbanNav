import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recorrido,
  Barrio,
} from '../models';
import {RecorridoRepository} from '../repositories';

export class RecorridoBarrioController {
  constructor(
    @repository(RecorridoRepository)
    public recorridoRepository: RecorridoRepository,
  ) { }

  @get('/recorridos/{id}/barrio', {
    responses: {
      '200': {
        description: 'Barrio belonging to Recorrido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Barrio),
          },
        },
      },
    },
  })
  async getBarrio(
    @param.path.number('id') id: typeof Recorrido.prototype.idRecorrido,
  ): Promise<Barrio> {
    return this.recorridoRepository.barrioOrigen(id);
  }
}
