import { SocketEvents } from './types';

export class Socket {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  public on(event: keyof typeof SocketEvents, callback: Function) {
    this.socket.addEventListener(event, callback);
    return this;
  }

  public send(data) {
    this.socket.send(data);
    return this;
  }

  public close() {
    return this.socket.close();
  }

  get state() {
    return this.socket.readyState;
  }
}
