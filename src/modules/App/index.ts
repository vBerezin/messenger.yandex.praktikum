import { EventEmitter } from 'events';
import { ComponentInterface } from '~modules/Component/types';

const el = document.querySelector('#app');
const emitter = new EventEmitter();
const debug = console.log;
let current = null;

export const App = {
  debug,
  user: undefined,
  on: emitter.on,
  off: emitter.off,
  emit: emitter.emit,
  init(component: ComponentInterface): void {
    if (current) {
      current.unmount();
    }
    if (el) {
      el.textContent = '';
      component.mount(el);
      current = component;
    }
  },
};
