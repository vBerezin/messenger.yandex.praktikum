import './style.scss';
import template from './template.pug';
import { Component } from 'common/scripts/modules/Component';

export class Popup extends Component {
  constructor(props) {
    super({ template, props });
  }

  render() {
    super.render(document.body);
    this.el.addEventListener('click', ({ target }) => {
      if (!target.closest('.popup__body')) {
        this.hide();
      }
    });
  }

  show() {
    this.el.classList.add('is-active');
  }

  hide() {
    this.el.classList.remove('is-active');
  }
}
