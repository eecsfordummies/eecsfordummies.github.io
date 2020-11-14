

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

function createGraphInput(graph, componentID) {
  let domContainer = document.querySelector(componentID);

  ReactDOM.render(<InputForm graph={graph}/>, domContainer);
}

function createDeleteButton(graph, componentID) {
  let domContainer = document.querySelector(componentID);

  ReactDOM.render(<DeleteButton graph={graph}/>, domContainer);
}
