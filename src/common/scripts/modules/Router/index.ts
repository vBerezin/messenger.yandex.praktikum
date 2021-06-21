import { EventEmitter } from 'events';
import { documentReady } from '~common/scripts/utils/documentReady';
import { EVENTS } from '~common/scripts/events';

export class Router {
  on;
  off;
  emit;
  private emitter: EventEmitter;
  private currentRoute: string;
  readonly routes: Map<string, Function>;

  constructor() {
    this.emitter = new EventEmitter();
    this.routes = new Map();
    this.currentRoute = '';
    this.on = this.emitter.on;
    this.off = this.emitter.off;
    this.emit = this.emitter.emit;
    documentReady(() => this.init());
    window.addEventListener('hashchange', () => this.init());
  }

  private init(): void | false {
    const { location: { pathname, hash } } = window;
    const path = `${pathname}${hash}`;
    if (this.currentRoute === path) {
      return false;
    }
    const callback = this.routes.get(path);
    if (typeof callback === 'function') {
      this.currentRoute = path;
      return callback();
    }
    this.emit(EVENTS.router.error, path);
  }

  add(route: string, onRoute: Function): void {
    this.routes.set(route, onRoute);
  }

  remove(route: string): void {
    this.routes.delete(route);
  }

  redirect(route: string): void {
    window.location.href = route;
  }
}
