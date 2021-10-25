import { UsersApiUser } from '~modules/Api/UsersApi/types';

export type ChatsApiRequest = Partial<{
    offset: number;
    limit: number;
    title: string;
}>;

export type ChatsApiResponse = {
    id: number;
    created_by: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: UsersApiUser;
        time: string;
        content: string;
    };
};

export type ChatsApiCreateRequest = {
    title: string;
};

export type ChatsApiCreateResponse = {
    id: number;
};

export type ChatsApiTokenResponse = {
    token: string;
};

export type ChatsApiAvatarRequest = {
    chatId: number;
    avatar: File;
};

export type ChatsApiDeleteRequest = {
    chatId: number;
};

export type ChatsApiDeleteResponse = {
    userId: number;
    result: ChatsApiResponse;
};
