import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import axios from 'axios';
import {ConfiguracionSeguridad} from '../config/seguridad.config';
import Grafo from '../graphModels/grafo';
import {Barrio, Conductor, Recorrido, RecorridoSolicitud} from '../models';
import {
  BarrioRepository,
  CiudadRepository,
  ConductorRepository,
  PuntuacionClienteRepository,
  PuntuacionConductorRepository,
  RecorridoRepository,
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class LogicaServicioService {
  constructor(
    @repository(ConductorRepository)
    public repositorioConductor: ConductorRepository,
    @repository(RecorridoRepository)
    public repositorioRecorrido: RecorridoRepository,
    @repository(BarrioRepository)
    public repositorioBarrio: BarrioRepository,
    @repository(PuntuacionConductorRepository)
    public repositorioPuntuacionConductor: PuntuacionConductorRepository,
    @repository(PuntuacionClienteRepository)
    public repositorioPuntuacionCliente: PuntuacionClienteRepository,
    @repository(CiudadRepository)
    public repositorioCiudad: CiudadRepository,
  ) { }

  /*
   * Add service methods here
   */

  //TODO: agregar una propiedad o relacion en el conductor donde indique el barrio donde está actualmente
  //TODO: un conductor está disponible si el atributo es "LIBRE"

  async buscarConductorMasCercano(
    recorrido: RecorridoSolicitud,
    idConductor: string = ''
  ): Promise<Conductor> {
    // tomar el recorrido que quiere recorrer dicho usuario

    // el usuario esta en el origen
    let origen = recorrido.barrioOrigenId; //<-- ya sabemos que el usuario está ahí en el origen
    let destino = recorrido.barrioDestinoId;

    console.log(origen);
    console.log(destino);

    //buscar que conductores estan disponibles y ya sabemos en que posicion estan
    let conductoresDisponibles = await this.repositorioConductor.find({
      where: {estadoServicio: 'LIBRE'},
    });
    // console.log(conductoresDisponibles)

    let barrios = await this.repositorioBarrio.find();
    // console.log(barrios)

    let grafo = new Grafo<number>();

    barrios.forEach((barrio: Barrio) => {
      grafo.agregarNodo(barrio.idBarrio!);
    });
    console.log(grafo.obtenerNodos());

    let recorridos = await this.repositorioRecorrido.find();
    recorridos.map((recorrido: Recorrido) => {
      grafo.agregarArista(
        recorrido.barrioOrigenId,
        recorrido.barrioDestinoId,
        recorrido.DistanciaKM,
      );
    });
    console.log(grafo.obtenerAristas());

    //ejecutar dijkstra
    let distanciaMasCorta = grafo.dijkstra(origen);
    //quitar las distancias que tienen como peso INFINITY
    distanciaMasCorta.forEach((distancia, nodo) => {
      if (distancia == Infinity) {
        distanciaMasCorta.delete(nodo);
      }
    });
    console.log('---------------------');
    console.log('Distancias más cortas desde el nodo', origen);
    distanciaMasCorta.forEach((distancia, nodo) => {
      console.log(`Nodo ${nodo}: Distancia = ${distancia}`);
    });

    //ordenar distanciMasCorta de menor a mayor distanciKm usando un ciclo
    let distanciasOrdenadas: any[] = [];
    distanciaMasCorta.forEach((distancia, nodo) => {
      distanciasOrdenadas.push({
        nodo: nodo,
        distancia: distancia,
      });
    });

    distanciasOrdenadas.sort((a, b) => {
      return a.distancia - b.distancia;
    });

    console.log('---------------------');
    console.log('Distancias ordenadas de menor a mayor');
    distanciasOrdenadas.forEach(distancia => {
      console.log(`Nodo ${distancia.nodo}: Distancia = ${distancia.distancia}`);
    });

    console.log('---------------------');

    conductoresDisponibles.forEach((conductor: Conductor) => {
      console.log(
        'DISPONIBLE: Conductor',
        conductor.primerNombre,
        'esta en el barrio',
        conductor.barrioId,
      );
    });

    //recorrer las distancias ordenadas y por cada una buscar que conductores están ahí
    let conductoresElegidos: Conductor[] = [];
    distanciasOrdenadas.forEach(distancia => {
      conductoresDisponibles.forEach((conductor: Conductor) => {
        if (conductor.idMongoDB != idConductor) {
          if (conductor.barrioId == distancia.nodo) {
            conductoresElegidos.push(conductor);
          }
        }
      });
    });

    console.log('---------------------');
    // dejar solo el conductor en la posicion 0
    let conductorMasCercano = conductoresElegidos[0];
    console.log(
      'El conductor mas cercano es:',
      conductorMasCercano.primerNombre,
      'que esta en el barrio',
      conductorMasCercano.barrioId,
    );

    return conductorMasCercano;
  }

  async obtenerInformacionBarrio(barrioId: number): Promise<any> {
    let barrio = await this.repositorioBarrio.findById(barrioId);
    let ciudad = await this.repositorioCiudad.findById(barrio.ciudadId);
    return {
      barrio,
      ciudad,
    };
  }

  async calcularPrecioRecorrido(idRecorrido: number): Promise<any> {
    let recorrido: Recorrido =
      await this.repositorioRecorrido.findById(idRecorrido);
    let precioPorKmSeguridad = await axios.get(
      `${ConfiguracionSeguridad.urlMicroservicioLogica}/variable/653131f2b1c0fb3c2822a8a6`,
    );
    console.log(precioPorKmSeguridad);
    let precioKm = precioPorKmSeguridad.data.valorVariable;
    //convertir precioKm a number
    let precioKMNumber = Number(precioKm);
    let precio = recorrido.DistanciaKM * precioKMNumber;
    return {
      precio,
      recorrido,
    };
  }

  async puntuacionResenasConductor(idResena: number): Promise<any> {
    let puntuaciones = await this.repositorioPuntuacionConductor.find();
    return puntuaciones.find(
      puntuacion => puntuacion.resenaViajeConductorId == idResena,
    );
  }

  async puntuacionResenasCliente(idResena: number): Promise<any> {
    let puntuaciones = await this.repositorioPuntuacionCliente.find();
    return puntuaciones.find(
      puntuacion => puntuacion.resenaViajeClienteId == idResena,
    );
  }

  async obtenerInformacionUsuarioEnSeguridad(id: string) {
    console.log(id);
    //TODO: HACER UNA LLAMADA A LÓGICA PARA OBTENER LA INFORMACION DE UN USUARIO POR SU IDMONGO
    const response = await axios.get(`http://localhost:3001/usuario/${id}`);
    return response.data;
  }

  //metodo que me retorne: una lista con todos los barrios y la ciudad a la que pertenece cada Barrio
  async obtenerBarriosCiudades(): Promise<any> {
    let barrios = await this.repositorioBarrio.find();
    const barriosCiudades = [];

    for (const barrio of barrios) {
      let ciudadId = barrio.ciudadId;

      try {
        let ciudad = await this.repositorioCiudad.findById(ciudadId);

        barriosCiudades.push({
          barrio: barrio.nombreBarrio,
          barrioId: barrio.idBarrio,
          ciudad: ciudad.Nombre,
          ciudadId: ciudad.idCiudad,
        });
      } catch (error) {
        // Manejar el error, por ejemplo, registrándolo o tomando alguna acción específica
        console.error(
          `Error al procesar el barrio ${barrio.nombreBarrio}: ${error.message}`,
        );
      }
    }

    return barriosCiudades;
  }

  //metodo que me retorne todos los recorridos con la informacion de su barrio de origen como de su barrio de destino
  async obtenerRecorridosBarrios(): Promise<any> {
    let recorridos = await this.repositorioRecorrido.find();
    const recorridosBarrios = [];

    for (const recorrido of recorridos) {
      let barrioOrigenId = recorrido.barrioOrigenId;
      let barrioDestinoId = recorrido.barrioDestinoId;

      try {
        let barrioOrigen =
          await this.repositorioBarrio.findById(barrioOrigenId);
        let barrioDestino =
          await this.repositorioBarrio.findById(barrioDestinoId);

        recorridosBarrios.push({
          recorrido,
          barrioOrigen,
          barrioDestino,
        });
      } catch (error) {
        // Manejar el error, por ejemplo, registrándolo o tomando alguna acción específica
        console.error(
          `Error al procesar el recorrido ${recorrido.idRecorrido}: ${error.message}`,
        );
      }
    }

    return recorridosBarrios;
  }
}
