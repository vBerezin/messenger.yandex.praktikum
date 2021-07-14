import { UserResponse } from '~modules/Api/types';
import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export enum StoreEvents {
  profileUpdate = 'store.profile:update',
  profileDelete = 'store.profile:delete',
  chatsUpdate = 'store.chats:update',
}

export enum StorePaths {
  profile = 'profile',
  chats = 'chats',
  users = 'users',
}

export type StoreState = Partial<{
  profile: UserResponse,
  users: UserResponse[],
  chats: ChatsResponse[],
}>

export type StoreActions = {
  [StoreEvents.profileUpdate]: (data: UserResponse) => void,
  [StoreEvents.profileDelete]: () => void,
  [StoreEvents.chatsUpdate]: (data: ChatsResponse[]) => void,
}
