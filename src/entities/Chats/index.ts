import {ChatsApi, UsersApi} from '~modules/Api';
import {
  ChatAvatarRequest,
  ChatSocketRequest,
  ChatsRequest,
  CreateChatsRequest
} from '~modules/Api/ChatsApi/types';
import { UsersRequest } from '~modules/Api/types';
import {Store} from "~modules/Store";

export const Chats = {
  getChats: ChatsApi.getChats,
  createChat: ChatsApi.createChat,
  addUsers: ChatsApi.addUsers,
  connectChat: ChatsApi.connectChat,
  deleteChat: ChatsApi.deleteChat,
};
