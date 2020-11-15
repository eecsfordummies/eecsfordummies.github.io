//import {Graph, Node, Edge} from './graph.js'

graph = createGraph(document.getElementById("myCanvas"));
createGraphInput(graph, '#input_container');
createDeleteButton(graph, '#delete_button_container');

let kruskals = createKruskals(graph);
let prims = createKruskals(graph); // NOT ACTUALLY PRIMS LOL
// console.log(kruskalsFunction);
createAlgorithmButton(kruskals, "Run Kruskals", "#start_kruskals_container");
createAlgorithmSidebar(kruskals, "kruskals", "#kruskals_container");
createAlgorithmButton(prims, "Run Prims", "#start_prims_container");
createAlgorithmSidebar(prims, "prims", "#prims_container");

console.log("HI!");
