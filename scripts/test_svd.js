var b1 = JXG.JSXGraph.initBoard('box1', {boundingbox: [-7.5, 7.5, 12.5, -7.5], axis: true});
b1.suspendUpdate();

var a = b1.create('slider',[[-5,-2],[5,-2],[-5,1,5]],{name:'a'});
var b = b1.create('slider',[[-5,-3],[5,-3],[-5,0,5]],{name:'b'});
var c = b1.create('slider',[[-5,-4],[5,-4],[-5,0,5]],{name:'c'});
var d = b1.create('slider',[[-5,-5],[5,-5],[-5,1,5]],{name:'d'});

var v = b1.create('point',[2,2],{size:3,name:'v'});
var w = b1.create('point',[-2,1],{size:3,name:'w'});
var va = b1.create('line',[[0,0],v],{straightFirst:false, straightLast:false, lastArrow:true});
var wa = b1.create('line',[[0,0],w],{straightFirst:false, straightLast:false, lastArrow:true});
b1.unsuspendUpdate();

  var b2 = JXG.JSXGraph.initBoard('box2', {boundingbox: [-7.5, 7.5, 12.5, -7.5], axis: true});
  b1.addChild(b2);
  b2.suspendUpdate();

  var v2 = b2.create('point',[
       function() {return a.Value()*v.X()+b.Value()*v.Y();},
       function() {return c.Value()*v.X()+d.Value()*v.Y();}],{face:'[]',size:2,name:"v'"});
  var w2 = b2.create('point',[
       function() {return a.Value()*w.X()+b.Value()*w.Y();},
       function() {return c.Value()*w.X()+d.Value()*w.Y();}],{face:'[]',size:2,name:"w'"});
  var va2 = b2.create('line',[[0,0],v2],{straightFirst:false, straightLast:false, lastArrow:true});
  var wa2 = b2.create('line',[[0,0],w2],{straightFirst:false, straightLast:false, lastArrow:true});
  var t = b2.create('text',[-6,-2,function(){ return '|'+(a.Value()).toFixed(2)+' '+(b.Value()).toFixed(2)+'|'+'<br>'+'|'+(c.Value()).toFixed(2)+' '+(d.Value()).toFixed(2)+'|';}]);
  b2.unsuspendUpdate();