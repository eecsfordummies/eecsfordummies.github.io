class Algorithm {
  object = null;
  algorithm = null;

  start() {
    this.setObjectAlgorithm();
    this.setObjectState('algorithm');
  }

  run() {
    let continueIteration = true;
    while (continueIteration) {
      let result = this.step();
      continueIteration = !result.done;
    }
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

  setObjectAlgorithm() {
    this.object.setAlgorithm(this);
  }

  constructor() {}
}
