import { documentReady } from 'common/scripts/utils/document-ready';
import { EventEmitter } from 'events';
import { EVENTS } from 'common/scripts/events';

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
    window.addEventListener('hashchange', () => this.init());
  }
  init() {
    const { location: { pathname, hash } } = window;
    const path = `${pathname}${hash}`;
    if (this.#currentRoute === path) {
      return false;
    }
    const hasRoute = this.routes.has(path);
    if (hasRoute) {
      this.#currentRoute = path;
      return this.routes.get(path)();
    }
    this.emit(EVENTS.router.error, path);
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
