import { Graph } from './graph.js';

const graph = new Graph();

graph.addEdges([
  ['A', 'B', 6],
  ['C', 'B', 2],
  ['A', 'C', 1],
  ['D', 'A', 3],
  ['C', 'D', 5],
]);

const { distances, parents } = graph.dijkstra('A');

const cost = [...distances.values()].reduce((acc, value) => acc + value, 0);

console.log({ distances, parents, cost });
