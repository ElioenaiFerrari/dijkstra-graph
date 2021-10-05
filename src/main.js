import { Graph } from './graph.js';

const graph = new Graph();

graph.addEdges([
  ['start', 'A', 6],
  ['start', 'B', 2],
  ['A', 'finish', 1],
  ['B', 'A', 3],
  ['B', 'finish', 5],
]);

const result = graph.dijkstra('start');

console.log(result);
