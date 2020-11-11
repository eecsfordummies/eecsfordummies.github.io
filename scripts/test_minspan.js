import {Graph, Node} from './graph.js'

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var graph = new Graph(ctx, c);
var node = new Node(200, 100);
var node2 = new Node(300, 400);
var edge = [node, node2];
var node3 = new Node(0, 0);
var node4 = new Node(0, 400);
var edge2 = [node3, node4];
var edge3 = [node3, node];
var edge4 = [node, node4];
graph.addNode(node);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addEdge(edge);
graph.addEdge(edge2);
graph.addEdge(edge3);
graph.addEdge(edge4);
graph.removeEdge(edge);
