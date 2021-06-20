export type FormUserField = {
  label: string,
  name: string,
  type: string,
  value: string | number,
}

export type FormUserFields = {
  [key: string]: FormUserField
}

export type FormUserProps = {
  image?: string,
  edit?: boolean,
  fields: FormUserFields,
}

export type FormUserState = {} | {
  edit: boolean,
}
