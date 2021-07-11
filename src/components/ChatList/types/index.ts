export type ChatListItem = {
  id: number,
  title: string,
  image?: string,
  message?: string,
  date?: string,
  count?: number,
}

export type ChatListState = Partial<{
  active: number | null,
  chats: ChatListItem[],
}>
