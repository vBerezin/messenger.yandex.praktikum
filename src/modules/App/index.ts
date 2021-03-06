import { ComponentInterface } from '~modules/Component/types';
import { Events } from '~modules/Events';

import { AppEvents } from './types';

class Application extends Events<AppEvents> {
    events = AppEvents;

    private current: ComponentInterface | null = null;

    private readonly el = window.document.body;

    init(component: ComponentInterface, title = ''): void {
      if (this.current) {
        this.current.unmount();
      }
      this.el.textContent = '';
      component.mount(this.el);
      this.current = component;
      document.title = title;
      this.emit(AppEvents.init, component);
    }

    error(error, data?) {
      this.emit(AppEvents.error, { error, ...data });
    }
}

export const App = new Application();
