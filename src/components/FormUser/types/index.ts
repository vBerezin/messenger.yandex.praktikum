import { FormFieldProps } from '~components/FormField/types';

type FormUserPropsBase = {
  image?: string | null,
  title?: string,
  fields: FormFieldProps[],
}
type FormUserPropsEdit = {
  image?: string | null,
  title?: string,
  edit: boolean,
  submit: Function,
  fields: FormFieldProps[],
}

export type FormUserProps =
  | FormUserPropsBase
  | FormUserPropsEdit

export type FormUserState = {
  edit?: boolean,
  image?: string | null,
  title?: string,
}
