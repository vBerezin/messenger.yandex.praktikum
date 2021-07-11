import { EventEmitter } from 'events';
import { ComponentInterface } from '~modules/Component/types';
import { AppEvents } from './events';

const el = document.querySelector('#app');
const emitter = new EventEmitter();
let current = null;

const App = {
  on: emitter.on,
  off: emitter.off,
  emit: emitter.emit,
  error(error, data?) {
    App.emit(AppEvents.error, {error, ...data});
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
    App.emit(AppEvents.init, component);
  }
};

export { App };
