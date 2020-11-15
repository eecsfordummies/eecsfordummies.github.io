class Algorithm {
  object = null;
  algorithm = null;

  start() {}

  run() {
    this.algorithm.return();
  }

  step() {
    this.algorithm.next();
  }
  reset() {}
  exit() {
    this.reset();
    this.setObjectState('write');
  }

  getObjectState() {
    return this.object.state;
  }

  setObjectState(state) {
    this.object.setState(state);
  }

  constructor() {}
}
