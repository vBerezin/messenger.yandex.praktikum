import { MessageProps } from '~components/Message/types';

export type DialogProps = {} | {
  messages: MessageProps[],
  chat: {
    title: string,
    image: string,
  },
};

export type DialogState = DialogProps;
