/* Do all general graph testing here.
Ex: learning graph objects, messing with
graph object file, etc. */

import {Graph, Node, Edge} from './graph.js'

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var graph = new Graph(ctx, c);
var node = new Node(200, 100, "A");
var node2 = new Node(300, 400, "B");
var edge = new Edge(node, node2);
var node3 = new Node(50, 50, "C");
var node4 = new Node(50, 400, "D");
var edge2 = new Edge(node3, node4);
var edge3 = new Edge(node3, node);
var edge4 = new Edge(node, node4);
graph.addNode(node);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addEdge(edge);
graph.addEdge(edge2);
graph.addEdge(edge3);
graph.addEdge(edge4);
// graph.removeEdge(edge);
// graph.removeNode(node4);
