import { isEqual } from '~common/scripts/utils/isEqual';
import { App } from '~modules/App';
import { Events } from '~modules/Events';
import { Templator } from '~modules/Templator';

import { ComponentEvents, ComponentInterface } from './types';

export abstract class Component<
        TProps,
        TState = TProps,
        TEvents = ComponentEvents,
    >
  extends Events<TEvents | ComponentEvents>
  implements ComponentInterface
{
    private _state: TState & TProps;

    el: HTMLElement;

    events: TEvents | ComponentEvents = ComponentEvents;

    private templator: Templator;

    private container;

    protected refs: {
        [key: string]: any;
    };

    public readonly props: typeof TProps;

    private compile() {
      try {
        this.templator.props = { ...this.props, ...this.state };
        return this.templator.compile();
      } catch (error) {
        return App.error(error);
      }
    }

    protected constructor({
      template,
      props = {},
      state = {},
    }: {
        template: (data: Record<string, any>) => string;
        props?: TProps;
        state?: TState;
    }) {
      super();
      this._state = { ...props, ...state };
      this.props = props;
      this.templator = new Templator({
        compiler: template,
        props: this._state,
      });
      this.el = this.compile();
      this.on(ComponentEvents.created, () => {
        this.bindClicks();
        this.makeRefs();
        this.created();
      });
      this.on(ComponentEvents.updated, this.updated.bind(this));
      this.on(ComponentEvents.mounted, this.mounted.bind(this));
      this.on(ComponentEvents.unmounted, this.unmounted.bind(this));
      this.emit(ComponentEvents.created);
    }

    protected created() {}

    protected updated() {}

    protected mounted() {}

    protected unmounted() {}

    get state(): TState {
      return this.getState();
    }

    private makeRefs() {
      const elements = this.el.querySelectorAll('[data-ref]');
      const refs = Array.from(elements).map((el) => {
        const name = el.getAttribute('data-ref');
        return {
          [name]: el,
        };
      });
      this.refs = refs.reduce(
        (total, current) => ({ ...total, ...current }),
        {},
      );
    }

    private bindClicks() {
      const elements = this.el.querySelectorAll('[data-click]');
      Array.from(elements).forEach((element) => {
        const action = element.dataset.click;
        element.addEventListener('click', (event) =>
          this[action](event, element),
        );
      });
    }

    getState() {
      return this._state;
    }

    setState(state: Partial<TState>) {
      const newState = { ...this.state, ...state };
      if (isEqual(this.state, newState)) {
        return this;
      }
      this._state = newState;
      const oldEl = this.el;
      this.el = this.compile();
      this.emit(ComponentEvents.created);
      if (oldEl) {
        if (this.container) {
          this.container.replaceChild(this.el, oldEl);
          this.emit(ComponentEvents.mounted);
        }
      }
      this.emit(ComponentEvents.updated);
      return this;
    }

    mount(container: Element) {
      container.appendChild(this.el);
      this.container = container;
      this.emit(ComponentEvents.mounted);
      return this;
    }

    unmount() {
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        this.container = null;
        this.emit(ComponentEvents.unmounted);
      }
      return this;
    }
}
