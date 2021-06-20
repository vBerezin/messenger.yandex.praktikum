export const Store = {
  async getData(path) {
    const response = await fetch(`/data/${path}`);
    const data = await response.json();
    return data;
  },
  getChats() {
    return this.getData('chats.json');
  },
  getHistory() {
    return this.getData('history.json');
  },
  getUsers() {
    return this.getData('users.json');
  },
  async getUserData(id) {
    const users = await this.getUsers();
    return users.find(user => +user.id === id);
  },
};
