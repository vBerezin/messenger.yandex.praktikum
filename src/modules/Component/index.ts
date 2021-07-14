import {ComponentProps, ComponentState, ComponentInterface, ComponentEvents} from './types';
import {isEqual} from '~common/scripts/utils/isEqual';
import {Events} from "~modules/Events";
import {Templator} from '~modules/Templator';
import {App} from "~modules/App";

export abstract class Component<TProps = ComponentProps, TState = ComponentState, TEvents = ComponentEvents>
    extends Events<TEvents | ComponentEvents>
    implements ComponentInterface {

    private templator;
    private container;

    events: TEvents | ComponentEvents = ComponentEvents;
    public readonly props: TProps & ComponentProps;

    #el;
    #state;

    #compile() {
        try {
            this.templator.data = {...this.props, ...this.state};
            return this.templator.compile();
        } catch (error) {
            return App.error(error);
        }
    };

    protected constructor({template, props = {}, state = {}}: {
        template: Function,
        props?: TProps & ComponentProps,
        state?: TState & ComponentState,
    }) {
        super();
        this.templator = new Templator({compiler: template});
        this.props = props;
        this.#state = {...props, ...state};
        this.#el = this.#compile();
        this.on(ComponentEvents.created, () => {
            this.bindEvents();
            this.created();
        });
        this.on(ComponentEvents.updated, this.updated.bind(this));
        this.on(ComponentEvents.mounted, this.mounted.bind(this));
        this.on(ComponentEvents.unmounted, this.unmounted.bind(this));
        this.emit(ComponentEvents.created);
    }

    created() {}
    updated() {}
    mounted() {}
    unmounted() {}

    get state(): TState & ComponentState {
        return this.getState();
    }

    get el() {
        return this.#el;
    }

    private bindEvents() {
        // TODO: Component addEventListener`ы
        this.el.addEventListener('click', (event) => {
            const target = event.target?.closest('[data-click]');
            if (target) {
                const action = target.dataset.click;
                if (this[action]) {
                    return this[action](event, target);
                }
            }
        });
    }

    getState() {
        return this.#state;
    }

    setState(state: Partial<TState & ComponentState>): ThisType<this> {
        const newState = {...this.state, ...state};
        if (isEqual(this.state, newState)) {
            return this;
        }
        this.#state = newState;
        const oldEl = this.el;
        this.#el = this.#compile();
        this.emit(ComponentEvents.created);
        if (oldEl) {
            if (this.container) {
                this.container.replaceChild(this.#el, oldEl);
                this.emit(ComponentEvents.mounted);
            }
        }
        this.emit(ComponentEvents.updated);
        return this;
    }

    mount(container: Element): ThisType<this> {
        container.appendChild(this.el);
        this.container = container;
        this.emit(ComponentEvents.mounted);
        return this;
    }

    unmount(): ThisType<this> {
        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
            this.container = null;
            this.emit(ComponentEvents.unmounted);
        }
        return this;
    }
}
