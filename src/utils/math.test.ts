import { describe, it, expect } from 'vitest';
import { shuffleArray } from './math';

describe('math utilities', () => {
  describe('shuffleArray', () => {
    it('returns a new array', () => {
      const original = [1, 2, 3];
      const shuffled = shuffleArray(original);
      expect(shuffled).not.toBe(original);
    });

    it('contains all the exact same elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled.length).toBe(original.length);
      expect(shuffled.sort()).toEqual(original.sort());
    });

    it('works with empty arrays', () => {
      const original: number[] = [];
      expect(shuffleArray(original)).toEqual([]);
    });

    it('works with single element arrays', () => {
      const original = [42];
      expect(shuffleArray(original)).toEqual([42]);
    });
  });
});
