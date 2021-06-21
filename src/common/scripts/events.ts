export const EVENTS = {
  router: {
    error: 'router:error',
  },
  component: {
    render: 'component:render',
    update: 'component:update',
    mount: 'component:mount',
    unmount: 'component:unmount',
  },
  app: {
    messenger: {
      chat: {
        selected: 'messenger.chat:selected',
        delete: 'messenger.chat:delete',
      },
      message: {
        send: 'messenger.message:send',
        delete: 'messenger.message:delete',
      }
    },
  }
};
