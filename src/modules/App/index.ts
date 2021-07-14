import { ComponentInterface } from '~modules/Component/types';
import { AppEvents } from './types';
import { Events } from '~modules/Events';

class Application extends Events<AppEvents> {
  events = AppEvents;
  private current: ComponentInterface | null = null;
  private readonly el = document.querySelector('#app');

  constructor() {
    super();
  }

  init(component: ComponentInterface, title: string = ''): void {
    if (this.current) {
      this.current.unmount();
    }
    this.el.textContent = '';
    component.mount(this.el);
    this.current = component;
    document.title = title;
    App.emit(AppEvents.init, component);
  }
  error(error, data?) {
    App.emit(AppEvents.error, {error, ...data});
  }
}

export const App = new Application();
