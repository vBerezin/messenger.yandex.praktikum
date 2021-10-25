import { ChatsApiResponse } from '~modules/Api/ChatsApi/types';
import { UsersApiUser } from '~modules/Api/UsersApi/types';

export type ChatListState = {
    active?: number;
    chats: ChatsApiResponse[];
    users: UsersApiUser[];
};

export enum ChatListEvents {
    chatSelected = 'chat.list.chat:selected',
    chatDeleted = 'chat.list.chat:deleted',
}
