import { EventEmitter } from 'events';
import { Templator } from '~common/scripts/modules/Templator';

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
    return this;
  }

  getState() {
    return this.#state;
  }

  render(container) {
    const el = this.#compile();
    if (container) {
      container.append(el);
    } else if (this.el){
      this.el.parentNode.replaceChild(el, this.el);
    }
    this.el = el;
    return this;
  }

  destroy() {
    this.el.parentNode.removeChild(this.el);
    this.#state = {};
    this.#emitter.removeAllListeners();
    return this;
  }
}
