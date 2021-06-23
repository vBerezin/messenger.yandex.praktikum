import './styles';
import template from './template';
import { ButtonProps } from './types';

import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps & ComponentProps) {
    super({ template, props });
  }
}
