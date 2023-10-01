import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import Grafo from './graphModels/grafo';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class App extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Crear una instancia del grafo
    const grafo = new Grafo<string>();

    // Agregar nodos y aristas al grafo
    grafo.agregarNodo('A');
    grafo.agregarNodo('B');
    grafo.agregarNodo('C');
    grafo.agregarNodo('D');

    grafo.agregarArista('A', 'B', 63);
    grafo.agregarArista('A', 'C', 91);
    grafo.agregarArista('B', 'C', 22);
    grafo.agregarArista('B', 'D', 98);
    grafo.agregarArista('C', 'D', 150);

    // Llamar al método dijkstra desde el nodo de inicio "A"
    const distanciaMasCorta = grafo.dijkstra('A');

    // Mostrar los resultados
    console.log("Distancias más cortas desde el nodo 'A':");
    distanciaMasCorta.forEach((distancia, nodo) => {
      console.log(`Nodo ${nodo}: Distancia = ${distancia}`);
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
