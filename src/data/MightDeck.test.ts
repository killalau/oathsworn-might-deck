import { MightDeck } from './MightDeck';
import {
  BlackDice,
  MightDiceFace,
  RedDice,
  WhiteDice,
  YellowDice,
} from './MightDice';

describe('MightDeck', () => {
  describe('.sort()', () => {
    it('sort cards based on values and critical', () => {
      expect(
        MightDeck.sort([
          new MightDiceFace(3),
          new MightDiceFace(2),
          new MightDiceFace(3, true),
          new MightDiceFace(1),
          new MightDiceFace(0),
          new MightDiceFace(0),
        ]),
      ).toEqual([
        new MightDiceFace(0),
        new MightDiceFace(0),
        new MightDiceFace(1),
        new MightDiceFace(2),
        new MightDiceFace(3),
        new MightDiceFace(3, true),
      ]);
    });
  });

  describe('.toString()', () => {
    it('displays the deck and discard pile', () => {
      const whiteDeck = new MightDeck(new WhiteDice());
      const yellowDeck = new MightDeck(new YellowDice());
      const redDeck = new MightDeck(new RedDice());
      const blackDeck = new MightDeck(new BlackDice());
      expect(whiteDeck.toString()).toEqual(`Deck(18):
[0]x6 [1]x6 [2]x3 {2}x3
Discard(0):
`);
      expect(yellowDeck.toString()).toEqual(`Deck(18):
[0]x6 [1]x3 [2]x3 [3]x3 {3}x3
Discard(0):
`);
      expect(redDeck.toString()).toEqual(`Deck(18):
[0]x6 [2]x3 [3]x6 {4}x3
Discard(0):
`);
      expect(blackDeck.toString()).toEqual(`Deck(18):
[0]x6 [3]x6 [4]x3 {5}x3
Discard(0):
`);
    });
  });

  describe('.shuffle()', () => {
    it('shuffles the deck', () => {
      const deck = new MightDeck(new WhiteDice());
      const originalDeck = [...deck.deck];
      const originalDeckContent = deck.toString();

      deck.shuffle();
      expect(deck.size).toEqual(18);
      expect(deck.deck.length).toEqual(18);
      expect(deck.deck).not.toEqual(originalDeck);
      expect(deck.toString()).toEqual(originalDeckContent);
    });
  });

  describe('.rollN', () => {
    it('draws from the top deck', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightDiceFace(0),
        new MightDiceFace(1),
        new MightDiceFace(2),
        new MightDiceFace(3),
      ]);
      const result = deck.drawN(2);
      expect(result).toHaveLength(2);
      expect(result).toEqual([new MightDiceFace(0), new MightDiceFace(1)]);
      expect(deck.deck).toEqual([new MightDiceFace(2), new MightDiceFace(3)]);
      expect(deck.discard).toEqual([
        new MightDiceFace(0),
        new MightDiceFace(1),
      ]);
    });
    describe('not enough card from deck', () => {
      it('also draws from discard pile', () => {
        const deck = new MightDeck(
          new WhiteDice(),
          [new MightDiceFace(0), new MightDiceFace(1)],
          [new MightDiceFace(2), new MightDiceFace(3)],
        );
        const result = deck.drawN(3);
        expect(deck.deck).toHaveLength(1);
        expect(deck.discard).toHaveLength(3);
        expect(MightDeck.sort([...deck.deck, ...deck.discard])).toEqual([
          new MightDiceFace(0),
          new MightDiceFace(1),
          new MightDiceFace(2),
          new MightDiceFace(3),
        ]);
        expect(result).toHaveLength(3);
        expect(result).toEqual(deck.discard);
        expect(result.slice(0, 2)).toEqual([
          new MightDiceFace(0),
          new MightDiceFace(1),
        ]);
        expect(result[2]).not.toEqual(deck.deck[0]);
      });
    });
  });
});
