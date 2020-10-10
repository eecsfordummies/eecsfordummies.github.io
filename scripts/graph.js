class Graph {
  radius = 40;
  constructor(ctx, canvas) {
    this.nodes = new Set();
    this.edges = new Set();
    this.ctx = ctx;
    this.canvas = canvas;
  }

  drawNode(node) {
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawEdge(edge) {
    var node1 = edge[0];
    var node2 = edge[1];

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
  }
  /*
  eraseEdge(edge) {
    var node1 = edge[0];
    var node2 = edge[1];
    this.ctx.strokeStyle = "#FFFFFF";
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

  addNodes(nodeIterable) {
    for (node in nodeIterable) {
      this.addNode(node)
    }
  }

  addEdge(edge) {
    if (edge.length != 2) {
      return;
    }
    var node1 = edge[0];
    var node2 = edge[1];
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
      this.edges.add(edge);
      this.drawEdge(edge);
    }
  }

  addEdges(edgeIterable) {
    for (edge in edgeIterable) {
      this.addEdge(edge);
    }
  }

  removeEdge(edge) {
    if (this.edges.has(edge)) {
      this.edges.delete(edge);
      this.redraw();
    }
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "#000000";
    for (let node of this.nodes) {
      this.drawNode(node);
    }
    for (let edge of this.edges) {
      this.drawEdge(edge);
    }
  }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export {Graph, Node};
