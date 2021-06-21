import { EventEmitter } from "events";
import { Templator } from "~common/scripts/modules/Templator";

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
  templator: Templator;
  el: Element;
  container: Element;
  state: ComponentState;
  setState: Function;
  getState: Function;
  render: Function;
  mount: Function;
  unmount: Function;
}
