import { expect } from 'chai';
import { Templator } from './index';

describe('Templator test', () => {
  it('Templator.compile should return Element', () => {
    const templator = new Templator({
      compiler: () => '<div></div>',
    });
    expect(templator.compile(), 'if 1 children in template').to.be.a('HTMLDivElement');
  });
  it('Templator.compile should return Error', () => {
    const templator = new Templator({
      compiler: () => '<div></div><div></div>',
    });
    expect(templator.compile, 'if 2 children in template').to.throw();
  });
});
