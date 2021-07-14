import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export type DialogProps = {} | {
  chat: Pick<ChatsResponse, 'id'>,
};

export type DialogState = {
  chat?: ChatsResponse
};
