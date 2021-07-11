import { EventEmitter } from 'events';
import { Templator } from '~modules/Templator';

export type ComponentProps = {
  class?: string,
  mods?: string | string[],
  attributes?: Object,
};

export type ComponentState = {};

export interface ComponentInterface {
  readonly on: Function;
  readonly off: Function;
  readonly emit: Function;
  readonly props: ComponentProps;
  readonly emitter: EventEmitter;
  readonly templator: Templator;
  readonly el: Element;
  readonly container: Element;
  readonly state: ComponentState;
  readonly setState: Function;
  readonly getState: Function;
  readonly mount: Function;
  readonly unmount: Function;
  created: Function;
  mounted: Function;
  unmounted: Function;
}
