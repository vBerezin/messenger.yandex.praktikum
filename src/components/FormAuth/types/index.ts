import { ButtonProps } from '~components/Button/types';
import { FormFieldProps } from '~components/FormField/types';
import { ComponentProps } from '~common/scripts/modules/Component/types';

export type FormAuthProps = ComponentProps & {
  title: string,
  fields: FormFieldProps[],
  buttons: ButtonProps[],
};
