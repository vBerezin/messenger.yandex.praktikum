import { UserResponse } from '~modules/Api/types';

export type ChatsRequest = Partial<{
  offset: number,
  limit: number,
  title: string,
}>

export type ChatsResponse = {
  id:	number
  created_by:	number
  title:	string
  avatar:	string
  unread_count:	number
  last_message:	{
    user:	UserResponse
    time:	string
    content:	string
  }
}

export type CreateChatsRequest = {
  title: string,
}

export type CreateChatsResponse = {
  id: number,
}

export type ChatsTokenResponse = {
  token: string,
}
export type ChatSocketRequest = {
  user: {
    id: number
  },
  chat: {
    id: number
  }
}
