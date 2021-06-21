export type StoreChat = {
  id: string | number,
  user: string | number,
  date: string | Date,
  count: string | number | undefined,
  message: string
}

export type StoreHistory = {
  id: string | number,
  user: string | number,
  messages: [] | undefined
}

export type StoreUser = {
  id: string | number,
  login: string,
  phone: string,
  display_name?: string | undefined,
  first_name?: string | undefined,
  second_name?: string | undefined,
  email?: string,
  image?: string,
  oldPassword?: string
}
