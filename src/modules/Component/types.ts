import { EventEmitter } from 'events';

import { Templator } from '~modules/Templator';

export enum ComponentEvents {
    created = 'component:created',
    updated = 'component:updated',
    mounted = 'component:mounted',
    unmounted = 'component:unmounted',
}

export interface ComponentInterface {
    readonly on: (event: string, callback: () => void) => void;
    readonly off: (event: string, callback: () => void) => void;
    readonly emit: (event: string) => void;
    readonly props?: Record<string, any>;
    readonly state: Record<string, any>;
    readonly emitter: EventEmitter;
    readonly templator: Templator;
    readonly el: Element;
    readonly container: Element;
    readonly setState: (state) => void;
    readonly getState: () => void;
    readonly mount: (container: Element) => void;
    readonly unmount: () => void;
    updated: () => void;
    mounted: () => void;
    unmounted: () => void;
    created: () => void;
}
