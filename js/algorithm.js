class Algorithm {
  object = null;
  algorithm = null;
  highlightedLine = 1;
  stack = new Array();
  ret = null;

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
      // console.log(result);
      continueIteration = !result.done;
      prevValue = result.value;
    }
  }

  step() {
    return this.algorithm.next();
  }

  reset() {}

  exit() {
    this.reset();
    this.setObjectState('write');
  }

  displayCode() {
    return '';
  }

  displayInfo() {
    return '';
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
  // will not change
  graph = null;

  // will change
  edges = new Array();
  addedEdges = new Set();
  union = null;
  node = null;
  edge = null;
  n0 = null;
  n1 = null;
  // a = null;

  constructor(graph) {
    super();
    this.object = graph;
    this.graph = graph;
    this.algorithm = this.kruskals();
  }

  * findHead(a) {
    let frame = new Map();
    frame.set('function', 'findHead');
    frame.set('node', a);
    this.stack.push(frame);
    this.highlightedLine = 16;
    yield 0;

    while (this.union.get(frame.get('node')) !== frame.get('node')) {
      this.highlightedLine = 17;
      yield 0;

      frame.set('node', this.union.get(frame.get('node')));
      this.highlightedLine += 1;
      yield 0;
    }

    this.ret = frame.get('node');
    this.highlightedLine = 19;
    yield 0;
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

    for (this.node of this.graph.nodes) {
      this.highlightedLine = 2;
      yield 0;

      this.union.set(this.node, this.node);
      this.highlightedLine += 1;
      yield 0;
    }

    this.edges = Array.from(this.graph.edges);
    this.edges.sort(this.compare);
    this.highlightedLine = 5;
    yield 0;

    for (this.edge of this.graph.edges) {
      this.highlightedLine = 6;
      yield 0;

      this.highlightedLine += 1;
      yield 0;
      yield* this.findHead(this.edge.node0);
      this.n0 = this.ret;
      this.stack.pop();

      this.highlightedLine = 8;
      yield 0;
      yield* this.findHead(this.edge.node1);
      this.n1 = this.ret;
      this.stack.pop();

      this.highlightedLine = 10;
      yield 0;
      if (this.n0 !== this.n1) {
        this.union.set(this.n0, this.n1);
        this.highlightedLine += 1;
        yield 0;

        this.addedEdges.add(this.edge);
        this.graph.changeColor(this.edge, "red");
        this.highlightedLine += 1;
        yield 1;
      }
    }

    this.highlightedLine = 13;
    return;
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
    // general algorithm reset
    this.highlightedLine = 1;
    this.stack = new Array();
    this.ret = null;

    // algorithm-specific reset
    this.algorithm = this.kruskals();
    this.edges = new Array();
    this.addedEdges = new Set();
    this.edge = null;
    this.union = null;
    this.node = null;
    this.n0 = null;
    this.n1 = null;
    this.a = null;
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
               'exit(0)\n' +
               '\n' +
               '\n' +
               'def findHead(node):\n' +
               '\twhile(union[node] != node):\n' +
               '\t\tnode = union[node]\n' +
               '\treturn node\n';
    return code;
  }

  displayInfo() {
    let info = '';

    // General fields (always initialized)
    info += 'Nodes: ' + this.graph.nodes.toString() + '<br>';
    info += 'All edges: ' + this.graph.edges.toString() + '<br>';
    info += 'Added edges: ' + this.addedEdges.toString() + '<br>';

    // Initialized while running
    if (this.union !== null) {
      info += 'union: ' + this.union.toString() + '<br>';
    }
    if (this.node !== null) {
      info += 'node: ' + this.node.toString() + '<br>';
    }
    if (this.edge !== null) {
      info += 'edge: ' + this.edge.toString() + '<br>';
    }
    if (this.n0 !== null) {
      info += 'node0: ' + this.n0.toString() + '<br>';
    }
    if (this.n1 !== null) {
      info += 'node1: ' + this.n1.toString() + '<br>';
    }

    // stack
    for (let frame of this.stack) {
      info += '<br>';
      let keys = frame.keys();
      for (let key of keys) {
        info += key + ': ' + frame.get(key).toString() + '<br>';
      }
    }

    /*let info = 'Nodes: ' + this.graph.nodes + '\n' +
               'Edges: ' + this.graph.edges + '\n' +
               'Added edges: ' + this.addedEdges + '\n' +
               'edge: ' + this.edge + '\n' +
               'union: ' + this.union + '\n' +
               'node0: ' + this.n0 + '\n' +
               'node1: ' + this.n1 + '\n' +
               '\n' +
               'findHead(a):\n' +
               'a: ' + this.a;*/
    return info;
  }
}

function createKruskals(graph) {
  return new Kruskals(graph);
}


class Prims extends Algorithm {
  // will not change
  graph = null;

  // will change
  edges = new Array();
  addedEdges = new Set();
  union = null;
  node = null;
  edge = null;
  n0 = null;
  n1 = null;
  // a = null;

  constructor(graph) {
    super();
    this.object = graph;
    this.graph = graph;
    this.algorithm = this.prims();
  }

  * findHead(a) {
    let frame = new Map();
    frame.set('function', 'findHead');
    frame.set('node', a);
    this.stack.push(frame);
    this.highlightedLine = 16;
    yield 0;

    while (this.union.get(frame.get('node')) !== frame.get('node')) {
      this.highlightedLine = 17;
      yield 0;

      frame.set('node', this.union.get(frame.get('node')));
      this.highlightedLine += 1;
      yield 0;
    }

    this.ret = frame.get('node');
    this.highlightedLine = 19;
    yield 0;
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

  * prims() {
    this.graph.deselectSelected();

    this.union = new Map();

    for (this.node of this.graph.nodes) {
      this.highlightedLine = 2;
      yield 0;

      this.union.set(this.node, this.node);
      this.highlightedLine += 1;
      yield 0;
    }

    this.edges = Array.from(this.graph.edges);
    this.edges.sort(this.compare);
    this.highlightedLine = 5;
    yield 0;

    for (this.edge of this.graph.edges) {
      this.highlightedLine = 6;
      yield 0;

      this.highlightedLine += 1;
      yield 0;
      yield* this.findHead(this.edge.node0);
      this.n0 = this.ret;
      this.stack.pop();

      this.highlightedLine = 8;
      yield 0;
      yield* this.findHead(this.edge.node1);
      this.n1 = this.ret;
      this.stack.pop();

      this.highlightedLine = 10;
      yield 0;
      if (this.n0 !== this.n1) {
        this.union.set(this.n0, this.n1);
        this.highlightedLine += 1;
        yield 0;

        this.addedEdges.add(this.edge);
        this.graph.changeColor(this.edge, "red");
        this.highlightedLine += 1;
        yield 1;
      }
    }

    this.highlightedLine = 13;
    return;
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
    for (let node of this.graph.nodes) {
      this.graph.changeHeuristic(node, Infinity);
    }

    // general algorithm reset
    this.highlightedLine = 1;
    this.stack = new Array();
    this.ret = null;

    // algorithm-specific reset
    this.algorithm = this.prims();
    this.edges = new Array();
    this.addedEdges = new Set();
    this.edge = null;
    this.union = null;
    this.node = null;
    this.n0 = null;
    this.n1 = null;
    this.a = null;
  }

  exit() {
    this.reset();
    for (let node of this.graph.nodes) {
      this.graph.changeHeuristic(node, null);
    }
    this.setObjectState('write');
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
               'exit(0)\n' +
               '\n' +
               '\n' +
               'def findHead(node):\n' +
               '\twhile(union[node] != node):\n' +
               '\t\tnode = union[node]\n' +
               '\treturn node\n';
    return code;
  }

  displayInfo() {
    let info = '';

    // General fields (always initialized)
    info += 'Nodes: ' + this.graph.nodes.toString() + '<br>';
    info += 'All edges: ' + this.graph.edges.toString() + '<br>';
    info += 'Added edges: ' + this.addedEdges.toString() + '<br>';

    // Initialized while running
    if (this.union !== null) {
      info += 'union: ' + this.union.toString() + '<br>';
    }
    if (this.node !== null) {
      info += 'node: ' + this.node.toString() + '<br>';
    }
    if (this.edge !== null) {
      info += 'edge: ' + this.edge.toString() + '<br>';
    }
    if (this.n0 !== null) {
      info += 'node0: ' + this.n0.toString() + '<br>';
    }
    if (this.n1 !== null) {
      info += 'node1: ' + this.n1.toString() + '<br>';
    }

    // stack
    for (let frame of this.stack) {
      info += '<br>';
      let keys = frame.keys();
      for (let key of keys) {
        info += key + ': ' + frame.get(key).toString() + '<br>';
      }
    }
    return info;
  }
}

function createPrims(graph) {
  return new Prims(graph);
}

/*
class Frame {
  variables = new Map();

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }

  set(varName, value) {
    this.variables.set(varName, value);
  }

  get(varName) {
    if (this.varables.has(varName)) {
      return this.variables.get(varName);
    } else {
      return
    }
  }
}

*/

// Modified toStrings

Array.prototype.toString = function() {
  rv = '[';
  for (let i = 0; i < this.length; i++) {
    rv += this[i].toString();
    if (i < this.length - 1) {
      rv += ', ';
    }
  }
  rv += ']';
  return rv;
}

Set.prototype.toString = function() {
  let temp = Array.from(this);
  rv = '{';
  for (let i = 0; i < temp.length; i++) {
    rv += temp[i].toString();
    if (i < temp.length - 1) {
      rv += ', ';
    }
  }
  rv += '}';
  return rv;
}

Map.prototype.toString = function() {
  let keys = Array.from(this.keys());
  rv = '{';
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    rv += key.toString() + ': ' + this.get(key).toString();
    if (i < keys.length - 1) {
      rv += ', ';
    }
  }
  rv += '}';
  return rv;
}
