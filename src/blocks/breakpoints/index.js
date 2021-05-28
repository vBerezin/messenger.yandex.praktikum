export class Breakpoints {
  #stream;
  #media;
  constructor(points) {
    this.current = '';
    this.points = {};
    this.#media = [];
    this.#stream = new Set();

    Object.entries(points).forEach(([name, screen]) => {
      const screenSize = parseInt(screen, 10);
      const media = window.matchMedia(`(min-width: ${screenSize}px)`);
      media.addListener(() => this.#refresh()); // TODO: deprecated??
      this.#media.push({name, screen: screenSize, media});
      this.points[name] = screenSize;
    });
    this.#media.sort((a, b) => a.screen - b.screen);
    this.#refresh();
  }
  indexOf(points) {
    /**
     * проверяет совпадает ли с текущим
     * */
    const matches = [].concat(points).filter(point => point === this.current);
    return matches.length ? matches : null;
  };
  once(points, fn, cb) {
    /**
     * один раз fn или cb
     * */
    let allowFn = true;
    let allowCb = true;
    const handler = (args) => {
      if (this.indexOf(points)) {
        if (fn && allowFn) {
          allowFn = false;
          allowCb = true;
          return fn(args);
        }
      } else if (cb && allowCb) {
        allowCb = false;
        allowFn = true;
        return cb(args);
      }
    };
    this.#stream.add(handler);
    handler(this.current);
  };
  on(points, fn, cb) {
    /**
     * каждый раз fn или cb
     * */
    const handler = (args) => {
      if (this.indexOf(points)) {
        if (fn) {
          return fn(args);
        }
      } else if (cb) {
        return cb(args);
      }
    };
    this.#stream.add(handler);
    handler(this.current);
  };
  change (callback) {
    /**
     * при изменении
     * */
    let last = this.current;
    if (this.current) {
      callback(this.current);
    }
    this.#stream.add((args) => {
      if (this.current !== last) {
        last = this.current;
        callback(args);
      }
    });
  };
  #refresh () {
    const active = this.#media.filter(point => point.media.matches);
    this.current = active.length ? active.slice(-1)[0].name : null;
    this.#stream.forEach(callback => callback(this.current));
  };
}
