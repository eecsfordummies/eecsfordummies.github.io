function kruskals(graph) {
  graph.deselectSelected();

  function findHead(a) {
    while (union.get(a) !== a) {
      a = union.get(a);
    }
    return a;
  }

  let union = new Map();
  for (let node of graph.nodes) {
    union.set(node, node);
  }

  function compare(a, b) {
    if (a.weight > b.weight) {
      return 1;
    } else if (b.weight > a.weight) {
      return -1;
    } else {
      return 0;
    }
  }

  let edges = Array.from(graph.edges);
  edges.sort(compare);
  while(edges.length > 0) {
    let edge = edges.shift(); // edges.pop(0)
    let n0 = findHead(edge.node0);
    let n1 = findHead(edge.node1);

    if (n0 !== n1) {
      union.set(n0, n1);
      graph.changeColor(edge, "red");
    }
  }

}

function createKruskals(graph) {
  return function() {
    kruskals(graph);
  }
}
