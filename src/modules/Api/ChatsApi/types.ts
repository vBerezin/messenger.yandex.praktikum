import { UserResponse } from '~modules/Api/types';

export type ChatsResponse = {
  id:	number
  title:	string
  avatar:	string
  unread_count:	number
  last_message:	{
    user:	UserResponse
    time:	string
    content:	string
  }
}
