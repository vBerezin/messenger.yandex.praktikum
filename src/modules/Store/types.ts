import { UserResponse } from '~modules/Api/types';
import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export type StoreState = {
  user?: {
    profile: UserResponse
  },
  chats?: ChatsResponse[],
}
