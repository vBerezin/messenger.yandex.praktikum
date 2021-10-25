import { ChatsApi, MessagesApi } from '~modules/Api';
import { Events } from '~modules/Events';
import { Socket } from '~modules/Socket';

import { MessagesControllerEvents, MessagesControllerProps } from './types';

export class MessagesController extends Events<MessagesControllerEvents> {
    events = MessagesControllerEvents;

    private ping;

    private socket: Socket;

    private readonly connect: Promise<Socket>;

    constructor(props: MessagesControllerProps) {
      super();
      this.connect = ChatsApi.getToken(props.chat.id)
        .then(({ token }) =>
          MessagesApi.connect({
            token,
            chat: props.chat,
            user: props.user,
          }),
        )
        .then((socket) => {
          socket.on(socket.events.message, (data) => {
            if (data.type === 'message' || Array.isArray(data)) {
              this.emit(this.events.received, data);
            }
            if (data.type === 'user connected') {
              this.emit(this.events.userConnected, data);
            }
          });
          this.ping = setInterval(() => MessagesApi.ping(socket), 200);
          this.socket = socket;
          this.emit(this.events.connect);
          return socket;
        });
    }

    getMessages(offset = 0) {
      this.connect.then((socket) => {
        socket.send({
          type: 'get old',
          content: `${offset}`,
        });
      });
    }

    disconnect() {
      clearInterval(this.ping);
      this.ping = null;
      return this.socket.close();
    }

    async sendMessage(message: string) {
      await MessagesApi.sendMessage(message, this.socket);
      this.emit(this.events.send, message);
    }
}
