import { EventEmitter } from 'events';
import { EVENTS } from './events';
// import * as points from 'common/styles/breakpoints.scss';
import { Breakpoints } from '../../components/Breakpoints';

export const App = (() => {
  const emitter = new EventEmitter();
  const debug = console.log;
  const breakpoints = new Breakpoints({
    xxs: 0,
    xs: '475px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
    xl: '1366px',
    xxl: '1440px',
  });
  breakpoints.change(point => debug(`breakpoint: ${point}`));
  return {
    debug,
    breakpoints,
    el: document.querySelector('#app'),
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
    render(component) {
      this.el.innerHTML = '';
      component.render(this.el);
      this.emit(EVENTS.app.init);
    },
  };
})();
