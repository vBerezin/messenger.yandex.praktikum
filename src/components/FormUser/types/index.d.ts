import { FormFieldProps } from '~components/FormField/types';

export type FormUserFields = FormFieldProps[];

export type FormUserProps = {
  image?: string,
  edit?: boolean,
  fields: FormUserFields,
  action?: string,
}

export type FormUserState = {} | {
  edit: boolean,
}
