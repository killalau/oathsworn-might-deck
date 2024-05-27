import { MightDiceFace } from './MightDice';

describe('MightDiceFace', () => {
  describe('.compare()', () => {
    it("returns -1 when dice A's value is smaller", () => {
      const a = new MightDiceFace(1);
      const b = new MightDiceFace(2);
      expect(MightDiceFace.compare(a, b)).toEqual(-1);
    });
    it("returns 1 when dice B's value is smaller", () => {
      const a = new MightDiceFace(1);
      const b = new MightDiceFace(2);
      expect(MightDiceFace.compare(b, a)).toEqual(1);
    });
    it('compares critical when dice values is equal', () => {
      const a = new MightDiceFace(2);
      const b = new MightDiceFace(2);
      const c = new MightDiceFace(2, true);
      const d = new MightDiceFace(2, true);
      expect(MightDiceFace.compare(a, b)).toEqual(0);
      expect(MightDiceFace.compare(b, a)).toEqual(0);
      expect(MightDiceFace.compare(a, c)).toEqual(-1);
      expect(MightDiceFace.compare(c, a)).toEqual(1);
      expect(MightDiceFace.compare(c, d)).toEqual(0);
      expect(MightDiceFace.compare(d, c)).toEqual(0);
    });
  });
});
