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
    it('compares color of the card', () => {
      const w0 = new MightCard(0, false, 'white');
      const w1 = new MightCard(1, false, 'white');
      const w1c = new MightCard(1, true, 'white');
      const y0 = new MightCard(0, false, 'yellow');
      const y1 = new MightCard(1, false, 'yellow');
      const r0 = new MightCard(0, false, 'red');
      const r1 = new MightCard(1, false, 'red');
      const b0 = new MightCard(0, false, 'black');
      const b1 = new MightCard(1, false, 'black');

      expect(MightCard.compare(w0, w1)).toEqual(-1);
      expect(MightCard.compare(w1c, w1)).toEqual(1);
      expect(MightCard.compare(w1, w1)).toEqual(0);

      expect(MightCard.compare(w1, y1)).toEqual(-1);
      expect(MightCard.compare(y1, r1)).toEqual(-1);
      expect(MightCard.compare(r1, b1)).toEqual(-1);

      expect(MightCard.compare(b0, w1)).toEqual(1);
      expect(MightCard.compare(r0, w1)).toEqual(1);
      expect(MightCard.compare(y0, w1)).toEqual(1);
    });
  });
});
