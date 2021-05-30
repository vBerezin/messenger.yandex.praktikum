import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/utils/component';
import '~components/Message';

export class Dialog extends Component {
  constructor(props) {
    super({ template, props });
  }
  render(container) {
    super.render(container);
  }
}
