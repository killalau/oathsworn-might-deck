import MightCard from './MightCard';
import MightDeck from './MightDeck';
import { BlackDice, RedDice, WhiteDice, YellowDice } from './MightDice';

const toleratedRelativeError = 0.05;

describe('MightDeck', () => {
  describe('.sort()', () => {
    it('sort cards based on values and critical', () => {
      expect(
        MightDeck.sort([
          new MightCard(3),
          new MightCard(2),
          new MightCard(3, true),
          new MightCard(1),
          new MightCard(0),
          new MightCard(0),
        ]),
      ).toEqual([
        new MightCard(0),
        new MightCard(0),
        new MightCard(1),
        new MightCard(2),
        new MightCard(3),
        new MightCard(3, true),
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

  describe('.drawN', () => {
    it('draws from the top deck and adds to the display', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightCard(0),
        new MightCard(1),
        new MightCard(2),
        new MightCard(3)
      ]);
      const result = deck.drawN(2);
      expect(result).toHaveLength(2);
      expect(result).toEqual([new MightCard(0), new MightCard(1)]);
      expect(deck.deck).toEqual([new MightCard(2), new MightCard(3)]);
      expect(deck.display).toEqual([new MightCard(0), new MightCard(1)]);
      expect(deck.discard).toEqual([]);
    });
  });

  describe('.discardDisplay', () => {
    it('discards the display to the discard pile', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightCard(0),
        new MightCard(1),
        new MightCard(2),
        new MightCard(3)
      ]);
      const result = deck.drawN(2);
      deck.discardDisplay();
      expect(result).toHaveLength(2);
      expect(result).toEqual([new MightCard(0), new MightCard(1)]);
      expect(deck.deck).toEqual([new MightCard(2), new MightCard(3)]);
      expect(deck.display).toEqual([]);
      expect(deck.discard).toEqual([new MightCard(0), new MightCard(1)]);
    })
  });

  describe('not enough card from deck', () => {
    it('also draws from discard pile', () => {
      const deck = new MightDeck(new WhiteDice(), 
        [new MightCard(0), new MightCard(1)],
        [new MightCard(2)],
        [new MightCard(3), new MightCard(4)]
      );
      const result = deck.drawN(3);
      expect(result).toHaveLength(3);
      expect(deck.deck).toHaveLength(1);
      expect(deck.display).toHaveLength(4);
      expect(deck.display).toEqual(expect.arrayContaining([new MightCard(0), new MightCard(1), new MightCard(2)]));
      expect(deck.discard).toHaveLength(0);
      expect(MightDeck.sort([...deck.deck, ...deck.display, ...deck.discard])).toEqual([
        new MightCard(0),
        new MightCard(1),
        new MightCard(2),
        new MightCard(3),
        new MightCard(4)
      ]);
    });
  });

  describe('.deckEV', () => {
    it('returns the expected value of the next drawn card', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightCard(0),
        new MightCard(1),
        new MightCard(2),
      ]);
      expect(deck.deckEV).toEqual(1);
    });
    it('returns the expected value of the next drawn card, including crits', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightCard(0),
        new MightCard(1),
        new MightCard(2, true)
      ]);
      expect(Math.abs(7/6-deck.deckEV)/deck.deckEV).toBeLessThanOrEqual(toleratedRelativeError);
    });
    it('returns the expected value of the next drawn card, being the sum if there are only crits', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightCard(2, true),
        new MightCard(2, true),
        new MightCard(2, true)
      ]);
      expect(deck.deckEV).toEqual(6);
    });
    it('returns the expected value of the next drawn card, being the sum if there are only crits', () => {
      const deck = new MightDeck(new WhiteDice(), [
        new MightCard(0, false),
        new MightCard(1, false),
        new MightCard(2, false),
        new MightCard(2, false),
        new MightCard(2, true)
      ]);
      expect(Math.abs(1.65-deck.deckEV)/deck.deckEV).toBeLessThanOrEqual(toleratedRelativeError);
    });
  });
});
