import { ROUTES } from '~common/scripts/routes';

/**
 * @param { Function } compiler - parcel при импорте .pug файла возвращает функцию pug.compile
 * @param { Object } data - параметры передаваемые в pug при компиляции шаблона
 * @function Compile  - Компилирует pug шаблон с параметрами и возвращает Element
 * */

export class Templator {
  data;
  compiler;

  constructor({ compiler, data = {} }: { compiler: Function, data?: {} }) {
    this.data = data;
    this.compiler = compiler;
  }

  compile() {
    const template = document.createElement('template');
    template.innerHTML = this.compiler({
      ROUTES,
      data: this.data,
    });
    const { children } = template.content;
    if (children.length > 1) {
      throw new Error('Шаблон должен иметь 1 родительский элемент');
    }
    return template.content.children[ 0 ];
  }
}
