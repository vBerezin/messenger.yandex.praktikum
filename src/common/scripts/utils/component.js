import { EventEmitter } from 'events';
import { EVENTS } from '~common/scripts/events';
import { Templator } from '~common/scripts/utils/templator';

export class Component {
  #state;
  #props;
  #emitter;
  #compile;
  #templator;
  constructor({ template, props = {} }) {
    this.#props = props;
    this.#state = props;
    this.#emitter = new EventEmitter();
    this.#templator = new Templator({ compiler: template });
    this.el = null;
    this.on = this.#emitter.on;
    this.off = this.#emitter.off;
    this.emit = this.#emitter.emit;
    this.#compile = () => {
      this.#templator.data = this.state;
      return this.#templator.compile();
    }
  }

  set state(state) {
    return this.setState(state);
  }

  get state() {
    return this.getState();
  }

  get props() {
    return this.#props;
  }

  setState(state) {
    this.#state = {...this.#state, ...state};
    this.update();
  }

  getState() {
    return this.#state;
  }

  update() {
    if (this.el.parentNode) {
      this.render(this.el.parentNode);
    }
  }

  render(container) {
    const el = this.#compile();
    if (this.el && container === this.el.parentNode) {
      container.replaceChild(el, this.el);
    } else {
      container.append(el);
    }
    this.el = el;
    this.emit(EVENTS.component.render, {
      el: this.el,
      props: this.state,
    });
    return this;
  }

  destroy() {
    this.el.parentNode.removeChild(this.el);
    this.emit(EVENTS.component.destroy);
    this.#state = {};
    this.#emitter.removeAllListeners();
  }
}
