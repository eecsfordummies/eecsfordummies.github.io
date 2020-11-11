

/*=================
    REACT STUFF
==================*/

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    graph.changeLabel(graph.selected, this.state.value);
    event.preventDefault();
  }

  clear() {
    this.setState({value: ""});
  }

  render() {
    if (graph.selected === null) {
      if (this.state.value != "") {
        this.clear();
      }
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit} >
        <label>
          Name:
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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    graph.removeNode(graph.selected);
  }

  render() {
    if (graph.selected === null) {
      return null;
    }

    return (
      <input type="button" value="Delete" onClick={this.handleSubmit}/>
    );
  }
}


function tick() {
  let domContainer = document.querySelector('#like_button_container');
  ReactDOM.render(<NameForm />, domContainer);
  domContainer = document.querySelector('#delete_button_container');
  ReactDOM.render(<DeleteButton />, domContainer);
}
setInterval(tick, 100);
