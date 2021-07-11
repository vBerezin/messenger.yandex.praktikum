import {EventEmitter} from 'events';
import {Templator} from '~modules/Templator';
import {ComponentEvents } from './events';
import {isEqual} from '~common/scripts/utils/isEqual';
import {ComponentProps, ComponentState, ComponentInterface} from './types';

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

    #render() {
        this.templator.data = {...this.props, ...this.state};
        return this.templator.compile();
    };

    protected constructor({template, props = {}, state = {}}: {
        template: Function,
        props?: TProps & ComponentProps,
        state?: TState & ComponentState,
    }) {
        this.emitter = new EventEmitter();
        this.on = this.emitter.on;
        this.emit = this.emitter.emit;
        this.off = this.emitter.off;
        this.templator = new Templator({compiler: template});
        this.props = props;
        this.#state = {...props, ...state};
        this.on(ComponentEvents.created, this.created);
        this.on(ComponentEvents.mounted, this.mounted);
        this.on(ComponentEvents.unmounted, this.unmounted);
    }

    created() {
    }

    mounted() {
    }

    unmounted() {
    }

    get state() {
        return this.getState();
    }

    get el() {
        return this.#el;
    }

    getState() {
        return this.#state;
    }

    setState(state: TState): ThisType<this> {
        const newState = {...this.state, ...state};
        if (isEqual(this.state, newState)) {
            return this;
        }
        this.#state = newState;
        const oldEl = this.el;
        const newEl = this.#render();
        this.#el = newEl;
        this.emit(ComponentEvents.created);
        if (oldEl && this.container === oldEl.parentNode) {
            this.container.replaceChild(newEl, oldEl);
            this.emit(ComponentEvents.mounted);
        }
        return this;
    }

    mount(container: Element): ThisType<this> {
        if (!this.el) {
            this.#el = this.#render();
            this.emit(ComponentEvents.created);
        }
        container.appendChild(this.el);
        this.container = container;
        this.emit(ComponentEvents.mounted);
        return this;
    }

    unmount(): ThisType<this> {
        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
            this.emit(ComponentEvents.unmounted);
        }
        return this;
    }
}
