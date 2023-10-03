import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class LogicaServicioService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  //TODO: agregar una propiedad o relacion en el conductor donde indique el barrio donde está actualmente
  //TODO: un conductor está disponible si el atributo es "LIBRE"
  buscarConductorMasCercano(recorrido: any) {
    // tomar el recorrido que quiere recorrer dicho usuario
    // el usuario esta en el origen

    //buscar que conductores estan disponibles y ya sabemos en que posicion estan

    //creamos el grafo

    //ejecutamos el dijkstra

    //retornamos el conductor mas cercano
  }
}
