import { EventEmitter } from 'events';
import { Templator } from '~modules/Templator';
import { EVENTS } from '~common/scripts/events';
import { isEqual } from '~common/scripts/utils/isEqual';
import { ComponentProps, ComponentState, ComponentInterface } from './types';

export abstract class Component<TProps = ComponentProps, TState = ComponentState> implements ComponentInterface {
  readonly on;
  readonly off;
  readonly emit;
  readonly props;
  private emitter;
  private templator;
  private container;

  #el;
  #state;

  protected constructor({ template, props = {}, state = {} }: {
    template: Function,
    props?: TProps & ComponentProps,
    state?: TState & ComponentState,
  }) {
    this.emitter = new EventEmitter();
    this.templator = new Templator({ compiler: template });
    this.props = props;
    this.on = this.emitter.on;
    this.emit = this.emitter.emit;
    this.off = this.emitter.off;
    this.#state = state;
    this.#el = this.#compile();
    this.on(EVENTS.component.update, () => this.#render());
    this.on(EVENTS.component.mount, () => this.#render());
  }

  #compile() {
    this.templator.data = { ...this.props, ...this.state };
    return this.templator.compile();
  };

  #render() {
    this.render();
    this.emit(EVENTS.component.render);
  }

  mount(container: Element) {
    container.append(this.#el);
    this.container = container;
    this.emit(EVENTS.component.mount, { container });
  }

  protected render() {}

  protected proxyState(state: TState): TState {
    return state;
  }

  get state() {
    return this.getState();
  }

  get el() {
    return this.#el;
  }

  setState(state: TState) {
    const newState = { ...this.state, ...state };
    const equal = isEqual(this.state, newState);
    if (equal) {
      return this;
    }
    this.#state = this.proxyState(newState);
    const newEl = this.#compile();
    const parent = this.el.parentNode || this.container;
    parent.replaceChild(newEl, this.#el);
    this.container = parent;
    this.#el = newEl;
    this.emit(EVENTS.component.update, { state: newState });
    return this;
  }

  getState() {
    return this.#state;
  }

  unmount() {
    this.container.removeChild(this.#el);
    this.#state = this.props;
    this.emit(EVENTS.component.unmount, { container: this.container });
    this.emitter.removeAllListeners();
    return this;
  }
}
