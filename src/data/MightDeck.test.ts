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
    it('sort the deck and discard pile', () => {
      const oneSetOfDiceFace = [
        new MightDiceFace(0),
        new MightDiceFace(0),
        new MightDiceFace(1),
        new MightDiceFace(1),
        new MightDiceFace(2),
        new MightDiceFace(2, true),
      ];
      const deck = new MightDeck(
        new WhiteDice(),
        [...oneSetOfDiceFace].reverse(),
        [...oneSetOfDiceFace].reverse(),
      );

      expect(deck.deck).not.toEqual(oneSetOfDiceFace);
      expect(deck.discard).not.toEqual(oneSetOfDiceFace);

      deck.sort();
      expect(deck.deck).toEqual(oneSetOfDiceFace);
      expect(deck.discard).toEqual(oneSetOfDiceFace);
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
});
