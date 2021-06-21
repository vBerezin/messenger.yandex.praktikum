export type Chat = {
  id: number,
  title: string,
  message: string,
  date: string,
  count: number,
}

export type ChatListProps = {} | {
  active: number | null,
  chats: Chat[],
}

export type ChatListState = {
  active?: number | null,
}
