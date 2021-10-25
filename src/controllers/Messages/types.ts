import { MessagesApiConnectProps } from '~modules/Api/MessagesApi/types';

export enum MessagesControllerEvents {
    connect = 'messages:connect',
    send = 'messages:send',
    userConnected = 'messages:user.connected',
    received = 'messages:received',
}

export type MessagesControllerProps = Pick<
    MessagesApiConnectProps,
    'user' | 'chat'
>;
