class Kruskals extends Algorithm {
  edges = new Array();
  union = new Map();
  graph = null;

  constructor(graph) {
    super();
    this.object = graph;
    this.graph = graph;
    this.algorithm = this.kruskals();
  }

  findHead(a) {
    while (this.union.get(a) !== a) {
      a = this.union.get(a);
    }
    return a;
  }

  compare(a, b) {
    if (a.weight > b.weight) {
      return 1;
    } else if (b.weight > a.weight) {
      return -1;
    } else {
      return 0;
    }
  }

  * kruskals() {
    this.graph.deselectSelected();

    this.union = new Map();
    for (let node of this.graph.nodes) {
      this.union.set(node, node);
    }

    this.edges = Array.from(this.graph.edges);
    this.edges.sort(this.compare);
    while(this.edges.length > 0) {
      let edge = this.edges.shift(); // edges.pop(0)
      let n0 = this.findHead(edge.node0);
      let n1 = this.findHead(edge.node1);

      if (n0 !== n1) {
        this.union.set(n0, n1);
        this.graph.changeColor(edge, "red");
        yield 0;
      }
    }
  }

  start() {
    this.reset();
    this.setObjectState('kruskals');
  }

  reset() {
    this.graph.deselectSelected();
    for (let edge of this.graph.edges) {
      this.graph.changeColor(edge, "black");
    }
    this.edges = new Set();
    this.union = new Map();
    this.algorithm = this.kruskals();
  }

  run() {
    let continueIteration = true;
    while (continueIteration) {
      let result = this.step();
      // console.dir(this.edges);
      continueIteration = !result.done;
    }
  }

  step() {
    return this.algorithm.next();
  }
}

function createKruskals(graph) {
  return new Kruskals(graph);
}
