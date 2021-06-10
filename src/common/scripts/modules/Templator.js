import { ROUTES } from '~common/scripts/routes';

export class Templator {
  constructor({ compiler, data = {} }) {
    this.data = data;
    this.compiler = compiler; // parcel при импорте .pug файла возвращает функцию pug.compile
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
    return template.content.children[0];
  }
}
