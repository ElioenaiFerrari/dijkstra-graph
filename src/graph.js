export class Graph {
  constructor() {
    this.vertices = new Set();
    this.edges = new Map();
  }

  /**
   *
   * @param {*} vertex
   */
  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.add(vertex);
    }
  }

  /**
   *
   * @param {*} origin
   * @param {*} destination
   * @param {number} weight
   */
  addEdge(origin, destination, weight = 0) {
    this.addVertex(origin);
    this.addVertex(destination);

    if (!this.edges.has(origin)) {
      this.edges.set(origin, {});
    }

    this.edges.get(origin)[destination] = weight;
  }

  /**
   *
   * @param {any[]} edges
   */
  addEdges(edges) {
    edges.forEach(([origin, destination, weight]) => {
      this.addEdge(origin, destination, weight);
    });
  }

  /**
   *
   * @param {*} origin
   */
  dijkstra(origin) {
    const visited = new Set();
    const parents = new Map();
    const distances = new Map();

    this.vertices.forEach((vertex) => {
      if (vertex === origin) {
        distances.set(origin, 0);
      } else {
        distances.set(vertex, Infinity);
      }

      parents.set(vertex, null);
    });

    let vertex = this.vertexWithMinDistance(distances, visited);

    while (vertex !== null) {
      const distance = distances.get(vertex);
      const neighbors = this.edges.get(vertex);

      if (neighbors) {
        Object.keys(neighbors).forEach((neighbor) => {
          const updatedDistance = distance + neighbors[neighbor];

          if (distances.get(neighbor) > updatedDistance) {
            distances.set(neighbor, updatedDistance);
            parents.set(neighbor, vertex);
          }
        });
      }

      visited.add(vertex);
      vertex = this.vertexWithMinDistance(distances, visited);
    }

    return { distances, parents };
  }

  /**
   *
   * @param {Map} distances
   * @param {Set} visited
   */
  vertexWithMinDistance(distances, visited) {
    let minVertex = null;
    let minDistance = Infinity;
    const vertices = [...distances.keys()];

    vertices.forEach((vertex) => {
      const distance = distances.get(vertex);

      if (distance < minDistance && !visited.has(vertex)) {
        minVertex = vertex;
        minDistance = distance;
      }
    });

    return minVertex;
  }
}
