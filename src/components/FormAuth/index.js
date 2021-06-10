import './style.scss';
import template from './template.pug';
import { Component } from '../../common/scripts/modules/Component';
import { FormField } from '../FormField';
import { formSubmitHandler } from '../../common/scripts/utils/form-submit-handler';
import '../Button';

export class FormAuth extends Component {
  constructor(props) {
    super({ template, props });
    this.fields = this.props.fields.map(field => new FormField({
      ...field,
      ...{
        class: 'form-auth__field',
      },
    }));
  }

  render(container) {
    super.render(container);
    this.renderFields();
    this.el.addEventListener('submit', formSubmitHandler);
  }

  renderFields() {
    const fieldSet = this.el.querySelector('fieldset');
    this.fields.forEach(field => field.render(fieldSet));
  }
}
