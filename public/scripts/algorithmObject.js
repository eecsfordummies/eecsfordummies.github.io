class AlgorithmObject {
  constructor() {}
  state = 'write';
  algortihm = null;

  setState(state) {
    this.state = state;
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
  }
}
