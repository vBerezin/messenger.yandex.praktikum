import { expect } from 'chai';
import { isObject } from '../src/common/scripts/utils/isObject';

describe('utils/isObject', () => {
  it('isObject', () => {
    expect(isObject({}), '{}').to.be.true;
    expect(isObject(''), '""').to.be.false;
    expect(isObject([]), '[]').to.be.false;
  });
});
