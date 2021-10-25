import { ChatsApiResponse } from '~modules/Api/ChatsApi/types';
import { UsersApiUser } from '~modules/Api/UsersApi/types';

export enum StoreEvents {
    update = 'store:update',
}

export enum StorePaths {
    profile = 'profile',
    chats = 'chats',
    users = 'users',
}

export type StoreState = {
    profile: UsersApiUser | undefined;
    users: UsersApiUser[] | [];
    chats: ChatsApiResponse[] | [];
};
