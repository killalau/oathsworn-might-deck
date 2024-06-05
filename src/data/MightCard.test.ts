import MightCard from './MightCard';

describe('MightCard', () => {
  describe('.compare()', () => {
    it("returns -1 when dice A's value is smaller", () => {
      const a = new MightCard(1);
      const b = new MightCard(2);
      expect(MightCard.compare(a, b)).toEqual(-1);
    });
    it("returns 1 when dice B's value is smaller", () => {
      const a = new MightCard(1);
      const b = new MightCard(2);
      expect(MightCard.compare(b, a)).toEqual(1);
    });
    it('compares critical when dice values is equal', () => {
      const a = new MightCard(2);
      const b = new MightCard(2);
      const c = new MightCard(2, true);
      const d = new MightCard(2, true);
      expect(MightCard.compare(a, b)).toEqual(0);
      expect(MightCard.compare(b, a)).toEqual(0);
      expect(MightCard.compare(a, c)).toEqual(-1);
      expect(MightCard.compare(c, a)).toEqual(1);
      expect(MightCard.compare(c, d)).toEqual(0);
      expect(MightCard.compare(d, c)).toEqual(0);
    });
  });
});
