import { ChatsApiResponse } from '~modules/Api/ChatsApi/types';

export enum DialogEvents {
    chatDelete = 'dialog.chat:delete',
}

export type DialogProps = {
    user: {
        id: number;
    };
    chat: ChatsApiResponse;
};

export type DialogState = {
    chat: ChatsApiResponse | null;
};
