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
      if (!this.state.visible) {
        return null;
      }

      var label = "Enter node value:";
      if (this.state.graph.selected instanceof Edge) {
        label = "Enter edge weight (integer):";
      }

      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "label",
          null,
          label,
          React.createElement("input", { type: "text", value: this.state.value, onChange: this.handleChange, style: { width: "50px" } })
        ),
        React.createElement("input", { type: "button", value: "Submit", onClick: this.handleSubmit })
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
      if (!this.state.visible) {
        return null;
      }

      return React.createElement("input", { type: "button", value: "Delete", onClick: this.handleSubmit });
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
      /*
      this.timerID = setInterval(
        () => this.tick(),
        100
      );
      */
    }
  }, {
    key: "tick",
    value: function tick() {
      /*
      if (this.state.graph.selected === null && this.state.visible) {
        this.setState({visible: false});
      } else if (this.state.graph.selected !== null && !this.state.visible) {
        this.setState({visible: true});
      } */
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      this.state.algorithm();
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.visible) {
        return null;
      }

      return React.createElement("input", { type: "button", value: this.state.label, onClick: this.handleSubmit });
    }
  }]);

  return AlgorithmButton;
}(React.Component);

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