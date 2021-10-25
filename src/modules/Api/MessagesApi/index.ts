import { Socket } from '~modules/Socket';

import { MessagesApiConnectProps } from './types';

export const MessagesApi = {
  async connect(data: MessagesApiConnectProps): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const url = `wss://ya-praktikum.tech/ws/chats/${data.user.id}/${data.chat.id}/${data.token}`;
      const socket = new Socket(url);
      socket.on(socket.events.open, () => resolve(socket));
      socket.on(socket.events.error, () => reject(socket));
    });
  },
  sendMessage(message: string, socket: Socket) {
    return socket.send({
      content: message,
      type: 'message',
    });
  },
  ping(socket: Socket) {
    return socket.send({
      type: 'ping',
    });
  },
};
