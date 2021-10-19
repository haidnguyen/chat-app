import { except } from './array';

describe('Array Utilities', () => {
  describe('except Function', () => {
    it('should remove a string from original string array', () => {
      const original = ['a', 'b', 'c'];
      const expectedResult = ['a', 'c'];

      expect(except('b')(original)).toEqual(expectedResult);
    });
  });
});
