//import {Graph, Node, Edge} from './graph.js'

graph = createGraph(document.getElementById("myCanvas"));
createGraphInput(graph, '#input_container');
createDeleteButton(graph, '#delete_button_container');

let kruskalsFunction = createKruskals(graph);
createAlgorithmButton(kruskalsFunction, "Run Kruskals", "#run_kruskals_container");

console.log("HI!");
