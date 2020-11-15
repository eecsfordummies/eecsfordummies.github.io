

/*=================
    REACT STUFF
==================*/

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', visible: false, graph: props.graph};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  tick() {
    if (this.state.graph.selected === null && this.state.visible) {
      this.setState({value: "", visible: false});
    } else if (this.state.graph.selected !== null && !this.state.visible) {
      this.setState({visible: true});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.state.graph.changeLabel(this.state.graph.selected, this.state.value);
    event.preventDefault();
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    let label = "Enter node value:";
    if (this.state.graph.selected instanceof Edge)  {
      label = "Enter edge weight (integer):";
    }

    return (
      <form onSubmit={this.handleSubmit} >
        <label>
          {label}
          <input type="text" value={this.state.value} onChange={this.handleChange} style={{width: "50px" }} />
        </label>
        <input type="button" value="Submit" onClick={this.handleSubmit}/>
      </form>

    );
  }
}

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, graph: props.graph};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  tick() {
    if (this.state.graph.selected === null && this.state.visible) {
      this.setState({visible: false});
    } else if (this.state.graph.selected !== null && !this.state.visible) {
      this.setState({visible: true});
    }
  }

  handleSubmit(event) {
    this.state.graph.remove(this.state.graph.selected);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <input type="button" value="Delete" onClick={this.handleSubmit}/>
    );
  }
}

class AlgorithmButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: true, algorithm: props.algorithm, label: this.props.label};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  tick() {
    if (this.state.algorithm.getObjectState() !== 'write' && this.state.visible) {
      this.setState({visible: false});
    } else if (this.state.algorithm.getObjectState() === 'write' && !this.state.visible) {
      this.setState({visible: true});
    }
  }

  handleSubmit(event) {
    this.state.algorithm.start();
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <input type="button" value={this.state.label} onClick={this.handleSubmit}/>
    );
  }
}

class AlgorithmSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, object: props.object, algorithm: null};
    this.handleRun = this.handleRun.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleExit = this.handleExit.bind(this);
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

  handleRun(event) {
    this.state.algorithm.run();
  }

  handleStep(event) {
    this.state.algorithm.step();
  }

  handleExit(event) {
    this.state.algorithm.exit();
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <div>
        <input type="button" value='Run' onClick={this.handleRun}/>
        <input type="button" value='Step' onClick={this.handleStep}/>
        <input type="button" value='Exit' onClick={this.handleExit}/>
      </div>
    );
  }
}

function createGraphInput(graph, componentID) {
  let domContainer = document.querySelector(componentID);

  ReactDOM.render(<InputForm graph={graph}/>, domContainer);
}

function createDeleteButton(graph, componentID) {
  let domContainer = document.querySelector(componentID);

  ReactDOM.render(<DeleteButton graph={graph}/>, domContainer);
}

function createAlgorithmButton(algorithm, label, componentID) {
  let domContainer = document.querySelector(componentID);

  ReactDOM.render(<AlgorithmButton algorithm={algorithm} label={label}/>, domContainer);
}

function createAlgorithmSidebar(object, componentID) {
  let domContainer = document.querySelector(componentID);

  ReactDOM.render(<AlgorithmSidebar object={object}/>, domContainer);
}
