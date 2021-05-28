import { EventEmitter } from 'events';
import { EVENTS } from '~common/scripts/events';

const emitter = new EventEmitter();

export const App = (() => {
  const app = {
    el: document.querySelector('#app'),
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
    render(component) {
      this.el.innerHTML = '';
      component.render(this.el);
      this.emit(EVENTS.app.init);
    },
    debug(message) {
      console.log(message);
    },
  };

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-click]');
    if (target) {
      app.emit(EVENTS.app.click, {
        event,
        name: target.dataset.click,
      });
    }
  });
  return app;
})();
