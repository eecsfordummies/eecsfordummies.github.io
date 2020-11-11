// import {Graph, Node, Edge} from './graph.js'

/*=================
       CANVAS
==================*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var graph = new Graph(ctx, c);

document.addEventListener("click", onClick);

var selectedNode = null;

function onClick(event) {
  if (event.x <= c.width && event.x >= 0 && event.y <= c.height && event.y >= 0){
    graph.handleClick(event);
  }
  /*
  let x = event.clientX;
  let y = event.clientY;
  var closest = graph.getNearestComponent(x, y);

  if (selectedNode === null && closest === null) {
    graph.addNode(new Node(x, y, "A"));
  } else if (selectedNode === null) {
    graph.changeColor(closest, "#00FA9A");
    selectedNode = closest;
  } else if (closest === null) {
    graph.changeColor(selectedNode, "#000000");
    selectedNode = null;
  } else {
    graph.addEdge(new Edge(selectedNode, closest));
    graph.changeColor(selectedNode, "#000000");
    selectedNode = null;
  } */

}
