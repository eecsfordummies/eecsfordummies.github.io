class Algorithm {
  object = null;
  algorithm = null;
  highlightedLine = 0;

  start() {
    this.setObjectAlgorithm();
    this.setObjectState('algorithm');
  }

  run() {
    let continueIteration = true;
    while (continueIteration) {
      let result = this.step();
      continueIteration = !result.done;
    }
  }

  iterate() {
    let continueIteration = true;
    let prevValue = null;
    while (continueIteration && prevValue != 1) {
      let result = this.step();
      continueIteration = !result.done;
      prevValue = result.value;
    }
  }

  step() {
    this.algorithm.next();
  }

  reset() {}

  exit() {
    this.reset();
    this.setObjectState('write');
  }

  displayCode() {

  }

  displayInfo() {

  }

  getObjectState() {
    return this.object.state;
  }

  setObjectState(state) {
    this.object.setState(state);
  }

  setObjectAlgorithm() {
    this.object.setAlgorithm(this);
  }

  constructor() {}
}



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
      this.highlightedLine = 2;
      yield 0;

      this.union.set(node, node);
      this.highlightedLine = 3;
      yield 0;
    }

    this.edges = Array.from(this.graph.edges);
    this.edges.sort(this.compare);
    this.highlightedLine = 5;
    yield 0;

    while(this.edges.length > 0) {
      this.highlightedLine = 6;
      yield 0;

      let edge = this.edges.shift(); // edges.pop(0)
      let n0 = this.findHead(edge.node0);
      this.highlightedLine = 7;
      yield 0;

      let n1 = this.findHead(edge.node1);
      this.highlightedLine = 8;
      yield 0;

      this.highlightedLine = 10;
      yield 0;
      if (n0 !== n1) {
        this.union.set(n0, n1);
        this.highlightedLine = 11;
        yield 0;

        this.graph.changeColor(edge, "red");
        this.highlightedLine = 12;
        yield 1;
      }
    }
  }

  start() {
    this.reset();
    this.setObjectAlgorithm();
    this.setObjectState('algorithm');
  }

  reset() {
    this.graph.deselectSelected();
    for (let edge of this.graph.edges) {
      this.graph.changeColor(edge, "black");
    }
    this.edges = new Set();
    this.union = new Map();
    this.algorithm = this.kruskals();
    this.highlightedLine = 0;
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

  displayCode() {
    let code = 'union = {}\n' +
               'for node in nodes:\n' +
               '\tunion[node] = node\n' +
               '\n' +
               'edges.sort(key = lambda edge: edge.weight) # sorts edges based on weight\n' +
               'for edge in edges:\n' +
               '\tnode0 = findHead(edge.node0)\n' +
               '\tnode1 = findHead(edge.node1)\n' +
               '\t\n' +
               '\tif node0 != node1:\n' +
               '\t\tunion[node0] = node1\n' +
               '\t\tadd(edge) # adds this edge to final graph\n' +
               '\n' +
               '\n' +
               'def findHead(node):\n' +
               '\twhile(union[node] != node):\n' +
               '\t\tnode = union[node]\n' +
               '\treturn node\n';
    return code;
  }
}

function createKruskals(graph) {
  return new Kruskals(graph);
}
