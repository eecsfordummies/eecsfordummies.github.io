//import {Graph, Node, Edge} from './graph.js'

graph = createGraph(document.getElementById("myCanvas"));
//createGraphInput(graph, '#input_container');
//createDeleteButton(graph, '#delete_button_container');
let kruskals = createKruskals(graph);
let prims = createPrims(graph); // NOT ACTUALLY PRIMS LOL
// console.log(kruskalsFunction);
//createAlgorithmButton(kruskals, "Run Kruskals", "#start_kruskals_container");
//createAlgorithmSidebar(graph, "#algorithm_sidebar_container");
//createAlgorithmButton(prims, "Run Prims", "#start_prims_container");
// createAlgorithmSidebar(prims, "Prims's Algorithm", "#prims_container");
// createCodeBlock(graph, '#test');
console.log("HI!");
createMinspanSidebar(graph, kruskals, prims, "#test");
