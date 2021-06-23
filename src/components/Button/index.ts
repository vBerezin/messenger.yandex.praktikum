import './styles';
import template from './template';
import { ButtonProps } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps & ComponentProps) {
    super({ template, props });
  }
}
