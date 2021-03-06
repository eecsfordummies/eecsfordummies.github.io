class AlgorithmObject {
  constructor() {}
  state = 'write';
  algorithm = new Algorithm();

  setState(state) {
    this.state = state;
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
  }
}

/*=================
       GRAPHS
==================*/

function getScrollingPosition(wrapper) {
  var position = [0, 0];
  if (typeof window.pageYOffset != 'undefined') {
    position = [
      window.pageXOffset,
      window.pageYOffset
    ];
  } else if (typeof document.documentElement.scrollTop
  != 'undefined' && document.documentElement.scrollTop > 0) {
    position = [
      document.documentElement.scrollLeft,
      document.documentElement.scrollTop
    ];
  } else if (typeof document.body.scrollTop != 'undefined') {
    position = [
      document.body.scrollLeft,
      document.body.scrollTop
    ];
  }
  position[0] += wrapper.scrollLeft;
  position[1] += wrapper.scrollTop;
  return position;
}

function pDistance(x, y, x1, y1, x2, y2) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

class Graph extends AlgorithmObject {
  radius = 40;
  selected = null;

  constructor(ctx, canvas, wrapper) {
    super();

    this.nodes = new Set();
    this.edges = new Set();
    this.ctx = ctx;
    this.canvas = canvas;
    this.wrapper = wrapper;
    this.rect = canvas.getBoundingClientRect();
  }

  drawNode(node) {
    this.ctx.strokeStyle = node.color;
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = 'middle';
    let label = node.label;
    if (node.heuristic !== null) {
      if (node.heuristic === Infinity) {
        label += ' | ∞';
      } else {
        label += ' | ' + node.heuristic;
      }
    }
    this.ctx.fillText(label, node.x, node.y);
  }

  drawEdge(edge) {
    var node1 = edge.node0;
    var node2 = edge.node1;

    this.ctx.strokeStyle = edge.color;
    this.ctx.beginPath();
    var x1 = node1.x;
    var y1 = node1.y;
    var x2 = node2.x;
    var y2 = node2.y;

    var lineX = x2-x1;
    var lineY = y2-y1;

    if (x2 >= x1) {
      var angle = Math.atan(lineY/lineX);
      var angle2 = Math.PI + angle;
    } else {
      var angle2 = Math.atan(lineY/lineX);
      var angle = Math.PI + angle2;
    }

    this.ctx.arc(x1, y1, this.radius, angle, angle);
    this.ctx.arc(x2, y2, this.radius, angle2, angle2);
    this.ctx.stroke();

    var midx = (x1 + x2)/2
    var midy = (y1 + y2)/2
    var angle_deg = angle * 180 / Math.PI;
    if ((angle_deg < 135 && angle_deg > 45) || (angle_deg > 225 && angle_deg < 315)) {
      midx += 15;
    } else {
      midy -= 15;
    }

    // console.log(angle_deg);

    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(edge.weight, midx, midy);
  }


  addNode(node) {
    this.nodes.add(node);
    this.drawNode(node);
  }

  removeNode(node) {
    if (!this.nodes.has(node)) {
      return;
    }
    for (let edge of this.edges) {
      if (edge.node0 == node || edge.node1 == node) {
        this.removeEdge(edge);
      }
    }
    this.nodes.delete(node);
    this.redraw();
  }

  addEdge(edge) {
    var node0 = edge.node0;
    var node1 = edge.node1;

    if (node0 == node1) {
      return -1;
    }

    for (let currEdge of this.edges) {
      // console.log("hii");
      if ((currEdge.node0 == node0 && currEdge.node1 == node1) || (currEdge.node0 == node1 && currEdge.node1 == node0)) {
        // console.log("hi");
        return -1;
      }
    }

    if (this.nodes.has(node0) && this.nodes.has(node1)) {
      this.edges.add(edge);
      this.drawEdge(edge);
    } else {
      return -1;
    }

    return 0;
  }

  removeEdge(edge) {
    if (this.edges.has(edge)) {
      this.edges.delete(edge);
      this.redraw();
    }
  }

  remove(component) {
    if (component instanceof Node) {
      this.removeNode(component);
      this.deselectSelected();
    } else if (component instanceof Edge) {
      this.removeEdge(component);
      this.deselectSelected();
    }
  }


  getNearestComponent(x, y) {
    var min = Number.MAX_SAFE_INTEGER;
    var current = null;
    for (let node of this.nodes) {
        var nodeX = node.x;
        var nodeY = node.y;

        var distance = Math.sqrt((x - nodeX)**2 + (y - nodeY)**2);
        if (distance < min) {
          min = distance;
          current = node;
        }
    }

    if (min < 50) {
      return current;
    }

    for (let edge of this.edges) {
      var node0 = edge.node0;
      var node1 = edge.node1;

      var x0 = node0.x;
      var y0 = node0.y;
      var x1 = node1.x;
      var y1 = node1.y;

      var distance = pDistance(x, y, x0, y0, x1, y1);
      if (distance < min) {
        min = distance;
        current = edge;
      }
    }

    if (min < 20) {
      return current;
    } else {
      return null;
    }
  }

  handleClick(event) {
    // console.log(this);
    if (this.state !== 'write') {
      return;
    }

    let x = event.clientX;
    let y = event.clientY;
    let scrollPos = getScrollingPosition(this.wrapper);
    x += scrollPos[0] - this.rect.left;
    y += scrollPos[1] - this.rect.top;

    var closest = this.getNearestComponent(x, y);

    if (this.selected === null && closest === null) {
      this.addNode(new Node(x, y, "A"));
    } else if (this.selected === null) {
      this.select(closest);
    } else if (closest === null) {
      this.deselectSelected();
    } else if (this.selected instanceof Node && closest instanceof Node) {
      if (this.addEdge(new Edge(this.selected, closest)) < 0) {
        this.deselectSelected();
        this.select(closest);
      } else {
        this.deselectSelected();
      }
    } else {
      this.deselectSelected();
      this.select(closest);
    }
  }

  select(component) {
    // this.deselectSelected(); should I include?
    this.changeColor(component, "#00FA9A");
    this.selected = component;
  }

  deselectSelected() {
    if (this.selected === null) {
      return;
    }
    this.changeColor(this.selected, "#000000");
    this.selected = null;
  }

  changeColor(component, color) {
    component.color = color;
    this.redraw();
  }

  changeLabel(component, label) {
    if (component instanceof Node) {
      component.label = label;
      this.redraw();
    } else if (component instanceof Edge) {
      let weight = parseInt(label);
      if (!isNaN(weight)) {
        component.weight = label;
        this.redraw();
      }
    }
  }

  changeHeuristic(component, heuristic) {
    if (component instanceof Node) {
      component.heuristic = heuristic;
      this.redraw();
    }
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let node of this.nodes) {
      this.drawNode(node);
    }
    for (let edge of this.edges) {
      this.drawEdge(edge);
    }
  }
}

class Node {
  color = "#000000";
  heuristic = null;

  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
  }

  toString() {
    return this.label;
  }
}

class Edge {
  color = "#000000";
  weight = 1;

  constructor(node0, node1) {
    this.node0 = node0;
    this.node1 = node1;
  }

  toString() {
    return '(' + this.node0.toString() + ', ' + this.node1.toString() + ')';
  }
}

function createGraph(canvas, wrapper) {
  var c = canvas;
  var ctx = c.getContext("2d");

  var graph = new Graph(ctx, c, wrapper);

  c.addEventListener("click", function(click) {graph.handleClick(click)});

  return graph;
}



// export {Graph, Node, Edge};
