class Grafo<T> {
  private nodos: Map<T, Map<T, number>>;

  constructor() {
    this.nodos = new Map();
  }

  agregarNodo(nodo: T) {
    if (!this.nodos.has(nodo)) {
      this.nodos.set(nodo, new Map());
    }
  }

  agregarArista(origen: T, destino: T, peso: number) {
    if (!this.nodos.has(origen) || !this.nodos.has(destino)) {
      throw new Error('Los nodos de origen y destino deben estar en el grafo.');
    }

    this.nodos.get(origen)!.set(destino, peso);
    this.nodos.get(destino)!.set(origen, peso); // Si el grafo es no dirigido, quita esta línea
  }

  obtenerAristas() {
    const aristas: Array<[T, T, number]> = [];

    for (const [origen, destinos] of this.nodos.entries()) {
      for (const [destino, peso] of destinos.entries()) {
        aristas.push([origen, destino, peso]);
      }
    }

    return aristas;
  }

  obtenerNodos() {
    return Array.from(this.nodos.keys());
  }

  //generate dijkstra algorithm recursively
  dijkstra(nodoInicio: T) {
    const distancias: Map<T, number> = new Map();
    const visitados: Set<T> = new Set();
    this.nodos.forEach((_, nodo) => distancias.set(nodo, Infinity));
    distancias.set(nodoInicio, 0);

    const obtenerNodoNoVisitadoConMenorDistancia = () => {
      let nodoNoVisitado: T | null = null;
      this.nodos.forEach((_, nodo) => {
        if (
          !visitados.has(nodo) &&
          (nodoNoVisitado === null ||
            distancias.get(nodo)! < distancias.get(nodoNoVisitado)!)
        ) {
          nodoNoVisitado = nodo;
        }
      });
      return nodoNoVisitado;
    };

    const relajarAristas = (nodoActual: T) => {
      this.nodos.get(nodoActual)!.forEach((peso, nodoDestino) => {
        const distanciaNueva = distancias.get(nodoActual)! + peso;
        if (distanciaNueva < distancias.get(nodoDestino)!) {
          distancias.set(nodoDestino, distanciaNueva);
        }
      });
      visitados.add(nodoActual);

      const nodoSiguiente = obtenerNodoNoVisitadoConMenorDistancia();
      if (nodoSiguiente) {
        relajarAristas(nodoSiguiente);
      }
    };

    const nodoSiguiente = obtenerNodoNoVisitadoConMenorDistancia();
    if (nodoSiguiente) {
      relajarAristas(nodoSiguiente);
    }

    return distancias;
  }
}

export default Grafo;
