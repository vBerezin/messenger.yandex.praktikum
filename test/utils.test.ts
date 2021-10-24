import { expect } from 'chai';

import { isObject } from '~common/scripts/utils/isObject';

describe('utils', () => {
  it('isObject', () => {
    expect(isObject({}), '{}').to.be.true;
    expect(isObject(''), '""').to.be.false;
    expect(isObject([]), '[]').to.be.false;
  });
});
