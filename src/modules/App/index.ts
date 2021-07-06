import { EventEmitter } from 'events';
import { ComponentInterface } from '~modules/Component/types';
import { EVENTS } from '~common/scripts/events';
import { Store } from '~modules/Store';

const el = document.querySelector('#app');
const emitter = new EventEmitter();
let current = null;

const App = {
  on: emitter.on,
  off: emitter.off,
  emit: emitter.emit,
  error(message) {
    App.emit(EVENTS.app.error, message);
  },
  init(component: ComponentInterface, title: string = ''): void {
    if (current) {
      current.unmount();
    }
    if (el) {
      el.textContent = '';
      component.mount(el);
      current = component;
    }
    document.title = title;
    App.emit(EVENTS.app.init, component);
  }
};

export { App };
