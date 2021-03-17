export default class {
  onCreate(_input, _output) {
    this.state = {
      count: 0,
      clickedModifier: '',
      statusText: '',
    };
  }

  onMount() {
    this.state.statusText = 'Behaviour Attached (click me)';
  }

  increment() {
    this.state.clickedModifier = 'click-banner--clicked';
    this.state.count += 1;
    this.state.statusText = `Clicked! New counter value is ${this.state.count}`;
  }
}
