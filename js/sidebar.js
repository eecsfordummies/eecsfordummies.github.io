var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*=================
    REACT STUFF
==================*/

var InputForm = function (_React$Component) {
  _inherits(InputForm, _React$Component);

  function InputForm(props) {
    _classCallCheck(this, InputForm);

    var _this = _possibleConstructorReturn(this, (InputForm.__proto__ || Object.getPrototypeOf(InputForm)).call(this, props));

    _this.state = { value: '', visible: false, graph: props.graph };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(InputForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 100);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.graph.selected === null && this.state.visible) {
        this.setState({ value: "", visible: false });
      } else if (this.state.graph.selected !== null && !this.state.visible) {
        this.setState({ visible: true });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      this.state.graph.changeLabel(this.state.graph.selected, this.state.value);
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var label = "Enter node value:";
      if (this.state.graph.selected instanceof Edge) {
        label = "Enter edge weight (integer):";
      }

      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit, "class": "col-xs", style: { display: this.state.visible ? 'block' : 'none' } },
        React.createElement(
          "label",
          null,
          React.createElement(
            "div",
            { "class": "row center-xs" },
            React.createElement(
              "div",
              { "class": "col-xs" },
              label
            )
          ),
          React.createElement(
            "div",
            { "class": "row" },
            React.createElement("input", { type: "text", "class": "col-xs", value: this.state.value, onChange: this.handleChange })
          )
        ),
        React.createElement(
          "div",
          { "class": "row" },
          React.createElement("input", { "class": "col-xs ", type: "button", value: "Submit", onClick: this.handleSubmit })
        )
      );
    }
  }]);

  return InputForm;
}(React.Component);

var DeleteButton = function (_React$Component2) {
  _inherits(DeleteButton, _React$Component2);

  function DeleteButton(props) {
    _classCallCheck(this, DeleteButton);

    var _this3 = _possibleConstructorReturn(this, (DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).call(this, props));

    _this3.state = { visible: false, graph: props.graph };
    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    return _this3;
  }

  _createClass(DeleteButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      this.timerID = setInterval(function () {
        return _this4.tick();
      }, 100);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.graph.selected === null && this.state.visible) {
        this.setState({ visible: false });
      } else if (this.state.graph.selected !== null && !this.state.visible) {
        this.setState({ visible: true });
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      this.state.graph.remove(this.state.graph.selected);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("input", { type: "button", "class": "col-xs ", value: "Delete", onClick: this.handleSubmit, style: { display: this.state.visible ? 'block' : 'none' } });
    }
  }]);

  return DeleteButton;
}(React.Component);

var AlgorithmButton = function (_React$Component3) {
  _inherits(AlgorithmButton, _React$Component3);

  function AlgorithmButton(props) {
    _classCallCheck(this, AlgorithmButton);

    var _this5 = _possibleConstructorReturn(this, (AlgorithmButton.__proto__ || Object.getPrototypeOf(AlgorithmButton)).call(this, props));

    _this5.state = { visible: true, algorithm: props.algorithm, label: _this5.props.label };
    _this5.handleSubmit = _this5.handleSubmit.bind(_this5);
    return _this5;
  }

  _createClass(AlgorithmButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      this.timerID = setInterval(function () {
        return _this6.tick();
      }, 100);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.algorithm.getObjectState() !== 'write' && this.state.visible) {
        this.setState({ visible: false });
      } else if (this.state.algorithm.getObjectState() === 'write' && !this.state.visible) {
        this.setState({ visible: true });
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      this.state.algorithm.start();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("input", { type: "button", "class": "col-xs ", value: this.state.label, onClick: this.handleSubmit, style: { display: this.state.visible ? 'block' : 'none' } });
    }
  }]);

  return AlgorithmButton;
}(React.Component);

var AlgorithmSidebar = function (_React$Component4) {
  _inherits(AlgorithmSidebar, _React$Component4);

  function AlgorithmSidebar(props) {
    _classCallCheck(this, AlgorithmSidebar);

    var _this7 = _possibleConstructorReturn(this, (AlgorithmSidebar.__proto__ || Object.getPrototypeOf(AlgorithmSidebar)).call(this, props));

    _this7.state = { visible: false, object: props.object, algorithm: props.object.algorithm };
    _this7.handleRun = _this7.handleRun.bind(_this7);
    _this7.handleIterate = _this7.handleIterate.bind(_this7);
    _this7.handleStep = _this7.handleStep.bind(_this7);
    _this7.handleRestart = _this7.handleRestart.bind(_this7);
    _this7.handleExit = _this7.handleExit.bind(_this7);
    return _this7;
  }

  _createClass(AlgorithmSidebar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this8 = this;

      this.timerID = setInterval(function () {
        return _this8.tick();
      }, 100);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.object.state !== 'algorithm' && this.state.visible) {
        this.setState({ visible: false });
      } else if (this.state.object.state === 'algorithm' && !this.state.visible) {
        this.setState({ visible: true, algorithm: this.state.object.algorithm });
      }
    }
  }, {
    key: "handleRun",
    value: function handleRun(event) {
      this.state.algorithm.run();
      this.forceUpdate();
    }
  }, {
    key: "handleIterate",
    value: function handleIterate(event) {
      this.state.algorithm.iterate();
      this.forceUpdate();
    }
  }, {
    key: "handleStep",
    value: function handleStep(event) {
      this.state.algorithm.step();
      this.forceUpdate();
    }
  }, {
    key: "handleRestart",
    value: function handleRestart(event) {
      this.state.algorithm.reset();
      this.forceUpdate();
    }
  }, {
    key: "handleExit",
    value: function handleExit(event) {
      this.state.algorithm.exit();
    }
  }, {
    key: "render",
    value: function render() {
      var code = this.state.algorithm.displayCode();
      var info = this.state.algorithm.displayInfo();
      // let str = 'print(1)';
      // let html = Prism.highlight(str, Prism.languages.python, 'python');
      var line = this.state.algorithm.highlightedLine;
      // console.log(line);
      setTimeout(Prism.highlightAll);

      return React.createElement(
        "div",
        { style: { display: this.state.visible ? 'block' : 'none' } },
        React.createElement(
          "div",
          { "class": "row" },
          React.createElement("input", { type: "button", "class": "col-xs", value: "Run", onClick: this.handleRun }),
          React.createElement("input", { type: "button", "class": "col-lg", value: "Iterate", onClick: this.handleIterate }),
          React.createElement("input", { type: "button", "class": "col-xs", value: "Step", onClick: this.handleStep })
        ),
        React.createElement(
          "div",
          { "class": "row" },
          React.createElement("input", { type: "button", "class": "col-xs", value: "Restart", onClick: this.handleRestart }),
          React.createElement("input", { type: "button", "class": "col-xs", value: "Exit", onClick: this.handleExit })
        ),
        React.createElement(
          "pre",
          { className: "line-numbers", "data-line": line },
          React.createElement(
            "code",
            { className: "language-python" },
            code
          )
        ),
        React.createElement("div", { dangerouslySetInnerHTML: { __html: info } })
      );
    }
  }]);

  return AlgorithmSidebar;
}(React.Component);

/*
class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, object: props.object, algorithm: null};
    // this.displayCode = this.displayCode.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  tick() {
    if (this.state.object.state !== 'algorithm' && this.state.visible) {
      this.setState({visible: false});
    } else if (this.state.object.state === 'algorithm' && !this.state.visible) {
      this.setState({visible: true, algorithm: this.state.object.algorithm});
    }
  }

  /*
  handleRun(event) {
    this.state.algorithm.run();
  }

  handleStep(event) {
    this.state.algorithm.step();
  }

  handleExit(event) {
    this.state.algorithm.exit();
  } */ /*
       render() {
       if (!this.state.visible) {
       return null;
       }
       let str = this.state.algorithm.displayCode();
       // let str = 'print(1)';
       let html = Prism.highlight(str, Prism.languages.python, 'python')
       setTimeout(Prism.highlightAll);
       return (
       <pre className="language-python line-numbers">
       <code className="language-python" dangerouslySetInnerHTML={{__html: html}}>
        </code>
       </pre>
       );
       }
       } */

function createGraphInput(graph, componentID) {
  var domContainer = document.querySelector(componentID);
  ReactDOM.render(React.createElement(InputForm, { graph: graph }), domContainer);
}

function createDeleteButton(graph, componentID) {
  var domContainer = document.querySelector(componentID);
  ReactDOM.render(React.createElement(DeleteButton, { graph: graph }), domContainer);
}

function createAlgorithmButton(algorithm, label, componentID) {
  var domContainer = document.querySelector(componentID);
  ReactDOM.render(React.createElement(AlgorithmButton, { algorithm: algorithm, label: label }), domContainer);
}

function createAlgorithmSidebar(object, componentID) {
  var domContainer = document.querySelector(componentID);
  ReactDOM.render(React.createElement(AlgorithmSidebar, { object: object }), domContainer);
}

function createCodeBlock(object, componentID) {
  var domContainer = document.querySelector(componentID);
  ReactDOM.render(React.createElement(CodeBlock, { object: object }), domContainer);
}

var MinspanSidebar = function (_React$Component5) {
  _inherits(MinspanSidebar, _React$Component5);

  function MinspanSidebar(props) {
    _classCallCheck(this, MinspanSidebar);

    var _this9 = _possibleConstructorReturn(this, (MinspanSidebar.__proto__ || Object.getPrototypeOf(MinspanSidebar)).call(this, props));

    _this9.state = { visible: true, graph: props.graph, kruskals: props.kruskals, prims: props.prims, tab: "about" };
    _this9.handleAbout = _this9.handleAbout.bind(_this9);
    _this9.handleEdit = _this9.handleEdit.bind(_this9);
    return _this9;
  }

  _createClass(MinspanSidebar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      /*
      this.timerID = setInterval(
        () => this.tick(),
        100
      ); */
    }
  }, {
    key: "tick",
    value: function tick() {
      // this.forceUpdate();

    }
  }, {
    key: "handleAbout",
    value: function handleAbout() {
      this.setState({ tab: "about" });
    }
  }, {
    key: "handleEdit",
    value: function handleEdit() {
      this.setState({ tab: "edit" });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { "class": "box" },
        React.createElement(
          "div",
          { "class": "row" },
          React.createElement("input", { type: "button", "class": "col-xs", value: "About", onClick: this.handleAbout }),
          React.createElement("input", { type: "button", "class": "col-xs", value: "Edit/Run", onClick: this.handleEdit })
        ),
        React.createElement(
          "div",
          { style: { display: this.state.tab === "about" ? 'block' : 'none' } },
          "Them trees do be short :flustered:"
        ),
        React.createElement(
          "div",
          { style: { display: this.state.tab === "edit" ? 'block' : 'none' } },
          React.createElement(
            "div",
            { "class": "row" },
            React.createElement(InputForm, { graph: this.state.graph })
          ),
          React.createElement(
            "div",
            { "class": "row" },
            React.createElement(DeleteButton, { graph: this.state.graph })
          ),
          React.createElement(
            "div",
            { "class": "row" },
            React.createElement(AlgorithmButton, { algorithm: this.state.kruskals, label: "Run Kruskals" })
          ),
          React.createElement(
            "div",
            { "class": "row" },
            React.createElement(AlgorithmButton, { algorithm: this.state.prims, label: "Run Prims" })
          ),
          React.createElement(AlgorithmSidebar, { object: this.state.graph })
        )
      );
    }
  }]);

  return MinspanSidebar;
}(React.Component);

function createMinspanSidebar(graph, kruskals, prims, componentID) {
  var domContainer = document.querySelector(componentID);
  ReactDOM.render(React.createElement(MinspanSidebar, { graph: graph, kruskals: kruskals, prims: prims }), domContainer);
}