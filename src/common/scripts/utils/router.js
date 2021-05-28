import { documentReady } from '~common/scripts/utils/document-ready';
import { EventEmitter } from 'events';
import { EVENTS } from '~common/scripts/events';

const emitter = new EventEmitter();

export class Router {
  #currentRoute;
  constructor() {
    this.routes = new Map();
    this.#currentRoute = '';
    this.on = emitter.on;
    this.off = emitter.off;
    this.emit = emitter.emit;
    documentReady(() => this.init());
  }
  init() {
    const { location: { pathname } } = window;
    if (this.#currentRoute === pathname) {
      return false;
    }
    const hasRoute = this.routes.has(pathname);
    if (hasRoute) {
      this.#currentRoute = pathname;
      return this.routes.get(pathname)();
    }
    this.emit(EVENTS.router.error, pathname);
  }
  add(route, onRoute) {
    this.routes.set(route, onRoute);
  }
  remove(route) {
    this.routes.delete(route);
  }
  redirect(route) {
    window.location = route;
  }
}
