function getScrollingPosition() {
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

class Graph {
  radius = 40;
  selected = null;

  constructor(ctx, canvas) {
    this.nodes = new Set();
    this.edges = new Set();
    this.ctx = ctx;
    this.canvas = canvas;
  }

  drawNode(node) {
    this.ctx.strokeStyle = node.color;
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(node.label, node.x, node.y);
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
/*
  eraseEdge(edge) {
    var node1 = edge[0];
    var node2 = edge[1];
    this.ctx.strokeStyle = "#FFFFFF";
    this.drawEdge(edge);
    this.drawNode(node1);
    this.drawNode(node2);
    this.drawEdge(edge);
    this.drawNode(node1);
    this.drawNode(node2);
    this.drawEdge(edge);
    this.drawNode(node1);
    this.drawNode(node2);
    this.drawEdge(edge);
    this.drawNode(node1);
    this.drawNode(node2);

    this.ctx.strokeStyle = "#000000";
    this.drawNode(node1);
    this.drawNode(node2);

  }
  */


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
      return;
    }

    for (let currEdge of this.edges) {
      // console.log("hii");
      if ((currEdge.node0 == node0 && currEdge.node1 == node1) || (currEdge.node0 == node1 && currEdge.node1 == node0)) {
        // console.log("hi");
        return;
      }
    }

    if (this.nodes.has(node0) && this.nodes.has(node1)) {
      this.edges.add(edge);
      this.drawEdge(edge);
    }
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

  handleClick(click) {
    let x = event.clientX;
    let y = event.clientY;
    let scrollPos = getScrollingPosition();

    x += scrollPos[0];
    y += scrollPos[1];

    var closest = this.getNearestComponent(x, y);

    if (this.selected === null && closest === null) {
      this.addNode(new Node(x, y, "A"));
    } else if (this.selected === null) {
      this.select(closest);
    } else if (closest === null) {
      this.deselectSelected();
    } else if (this.selected instanceof Node && closest instanceof Node) {
      this.addEdge(new Edge(this.selected, closest));
      this.deselectSelected();
    } else {
      this.deselectSelected();
      this.select(closest);
    }
  }

  select(component) {
    this.changeColor(component, "#00FA9A");
    this.selected = component;
  }

  deselectSelected() {
    this.changeColor(this.selected, "#000000");
    this.selected = null;
  }

  changeColor(component, color) {
    component.color = color;
    this.redraw();
  }

  changeLabel(component, label) {
    if (component instanceof Node) {
      this.changeNodeLabel(component, label);
    } else if (component instanceof Edge) {
      let weight = parseInt(label);
      if (!isNaN(weight)) {
        this.changeEdgeWeight(component, weight);
      }
    }
  }

  changeNodeLabel(node, label) {
    node.setLabel(label);
    this.redraw();
  }

  changeEdgeWeight(edge, weight) {
    edge.setWeight(weight);
    this.redraw();
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

  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
  }

  setColor(color) {
    this.color = color;
  }

  setLabel(label) {
    this.label = label;
  }
}

class Edge {
  color = "#000000";
  weight = 1;

  constructor(node0, node1) {
    this.node0 = node0;
    this.node1 = node1;
  }

  setWeight(weight) {
    this.weight = weight;
  }

  setColor(color) {
    this.color = color;
  }
}

/*=================
       CANVAS
==================*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var graph = new Graph(ctx, c);

c.addEventListener("click", onClick);
function onClick(event) {
  graph.handleClick(event);
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


// export {Graph, Node, Edge};
