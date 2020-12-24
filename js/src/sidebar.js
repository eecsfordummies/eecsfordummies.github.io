

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
    let label = "Enter node value:";
    if (this.state.graph.selected instanceof Edge)  {
      label = "Enter edge weight (integer):";
    }

    return (
      <form onSubmit={this.handleSubmit} class = "col-xs" style={{display: this.state.visible ? 'block' : 'none' }}>
        <label>
          <div class ="row center-xs"><div class = "col-xs">{label}</div></div>
          <div class ="row"><input type="text" class = "col-xs" value={this.state.value} onChange={this.handleChange}/></div>
        </label>
        <div class ="row"><input class = "col-xs " type="button" value="Submit" onClick={this.handleSubmit}/></div>
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
    return (
      <input type="button" class = "col-xs " value="Delete" onClick={this.handleSubmit} style={{display: this.state.visible ? 'block' : 'none' }}/>
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
    return (
      <input type="button" class = "col-xs " value={this.state.label} onClick={this.handleSubmit} style={{display: this.state.visible ? 'block' : 'none' }}/>
    );
  }
}

class AlgorithmSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, object: props.object, algorithm: props.object.algorithm};
    this.handleRun = this.handleRun.bind(this);
    this.handleIterate = this.handleIterate.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
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
    this.forceUpdate();
  }

  handleIterate(event) {
    this.state.algorithm.iterate();
    this.forceUpdate();
  }

  handleStep(event) {
    this.state.algorithm.step();
    this.forceUpdate();
  }

  handleRestart(event) {
    this.state.algorithm.reset();
    this.forceUpdate();
  }

  handleExit(event) {
    this.state.algorithm.exit();
  }

  render() {
    let code = this.state.algorithm.displayCode();
    let info = this.state.algorithm.displayInfo();
    // let str = 'print(1)';
    // let html = Prism.highlight(str, Prism.languages.python, 'python');
    let line = this.state.algorithm.highlightedLine;
    // console.log(line);
    setTimeout(Prism.highlightAll);

    return (
      <div style={{display: this.state.visible ? 'block' : 'none' }}>
        <div class ="row">
          <input type="button" class= "col-xs" value='Run' onClick={this.handleRun}/>
          <input type="button" class= "col-lg" value='Iterate' onClick={this.handleIterate}/>
          <input type="button" class= "col-xs" value='Step' onClick={this.handleStep}/>
        </div>
        <div class ="row">
          <input type="button" class= "col-xs" value='Restart' onClick={this.handleRestart}/>
          <input type="button" class= "col-xs" value='Exit' onClick={this.handleExit}/>
        </div>
        <pre className="line-numbers" data-line={line}>
          <code className="language-python">
          {code}
          </code>
        </pre>
        <div dangerouslySetInnerHTML={{__html: info}}></div>
      </div>
    );
  }
}

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
  } *//*

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

function createCodeBlock(object, componentID) {
  let domContainer = document.querySelector(componentID);
  ReactDOM.render(<CodeBlock object={object}/>, domContainer);
}

class MinspanSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: true, graph: props.graph, kruskals: props.kruskals, prims: props.prims, tab: "about"};
    this.handleAbout = this.handleAbout.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    /*
    this.timerID = setInterval(
      () => this.tick(),
      100
    ); */
  }

  tick() {
    // this.forceUpdate();

  }

  handleAbout() {
    this.setState({tab: "about"});
  }

  handleEdit() {
    this.setState({tab: "edit"});
  }

  render() {
    return (
      <div class = "box">
        <div class = "row">
          <input type="button" class = "col-xs" value="About" onClick={this.handleAbout}/>
          <input type="button" class = "col-xs" value="Edit/Run" onClick={this.handleEdit}/>
        </div>
        <div style={{display: this.state.tab === "about" ? 'block' : 'none' }}>
          Them trees do be short :flustered:
        </div>
        <div style={{display: this.state.tab === "edit" ? 'block' : 'none' }}>
          <div class = "row"><InputForm graph={this.state.graph}/></div>
          <div class = "row"><DeleteButton graph={this.state.graph}/></div>
          <div class = "row"><AlgorithmButton algorithm={this.state.kruskals} label="Run Kruskals"/></div>
          <div class = "row"><AlgorithmButton algorithm={this.state.prims} label="Run Prims"/></div>
          <AlgorithmSidebar object={this.state.graph}/>
        </div>
      </div>
    );
  }
}

function createMinspanSidebar(graph, kruskals, prims, componentID) {
  let domContainer = document.querySelector(componentID);
  ReactDOM.render(<MinspanSidebar graph={graph} kruskals={kruskals} prims={prims}/>, domContainer);
}
