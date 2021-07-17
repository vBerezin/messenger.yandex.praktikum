import {ChatsApi} from '~modules/Api';
import {
    ChatDeleteRequest,
    ChatsRequest,
} from '~modules/Api/ChatsApi/types';
import {Store} from "~modules/Store";

export const Chats = {
    async getChats() {
        const chats = await ChatsApi.getChats();
        Store.emit(Store.events.chatsUpdate, chats);
        return chats;
    },
    search: ChatsApi.getChats,
    createChat: ChatsApi.createChat,
    addUsers: ChatsApi.addUsers,
    connectChat: ChatsApi.connectChat,
    async deleteChat(data: ChatDeleteRequest) {
        const response = await ChatsApi.deleteChat(data);
        const chats = Store.state.chats;
        if (chats) {
            Store.emit(Store.events.chatsUpdate, chats.filter(chat => chat.id !== data.chatId));
        }
        return response;
    },
};
