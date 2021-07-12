import {ComponentEvents} from './events';
import {ComponentProps, ComponentState, ComponentInterface} from './types';
import {isEqual} from '~common/scripts/utils/isEqual';
import {Events} from "~modules/Events";
import {Templator} from '~modules/Templator';


export abstract class Component<TProps = ComponentProps, TState = ComponentState, TEvents = ComponentEvents>
    extends Events<TEvents & ComponentEvents>
    implements ComponentInterface {

    private templator;
    private container;

    readonly props: TProps & ComponentProps;

    #el;
    #state;

    #compile() {
        this.templator.data = {...this.props, ...this.state};
        return this.templator.compile();
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
        this.on(ComponentEvents.created, this.created.bind(this));
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

    getState() {
        return this.#state;
    }

    setState(state: TState & ComponentState): ThisType<this> {
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
