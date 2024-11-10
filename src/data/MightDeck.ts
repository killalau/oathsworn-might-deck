import MightCard from './MightCard';
import MightDice from './MightDice';
import { hypergeometricProbability } from '../modules/math';

const calculateExpectedValue = (cards: MightCard[]) =>
  cards.reduce((p, c) => p + c.value, 0) / cards.length;

export default class MightDeck {
  dice: MightDice;
  deck: MightCard[];
  discard: MightCard[];

  constructor(dice: MightDice, deck?: MightCard[], discard?: MightCard[]) {
    this.dice = dice;
    this.deck = deck
      ? [...deck]
      : [...dice.faces, ...dice.faces, ...dice.faces];
    this.discard = discard ? [...discard] : [];
  }

  clone(): MightDeck {
    const dup = new MightDeck(this.dice.clone());
    dup.deck = this.deck.map((d) => d.clone());
    dup.discard = this.discard.map((d) => d.clone());
    return dup;
  }

  shuffle(): MightDeck {
    this.deck.sort(() => (Math.random() >= 0.5 ? 1 : -1));
    return this;
  }

  draw(): MightCard {
    const [result] = this.drawN();
    return result;
  }

  drawN(times: number = 1): MightCard[] {
    if (this.deck.length === 0) {
      this.deck = this.discard;
      this.discard = [];
      this.shuffle();
    }

    if (times <= this.deck.length) {
      const result = this.deck.splice(0, times);
      this.discard = this.discard.concat(result);
      return result;
    }

    if (times <= this.size) {
      const result = [...this.deck];
      this.deck = this.discard;
      this.discard = result;
      this.shuffle();
      return [...result, ...this.drawN(times - this.discard.length)];
    }

    // times > deck.length + discard.length
    const reshuffleCount = Math.floor(times / this.size);
    this.deck = this.deck.concat(this.discard); // TODO: need review, we should draw the deck item first
    this.discard = [];
    let result: MightCard[] = [];
    for (let i = 0; i < reshuffleCount; i++) {
      result = result.concat(result);
    }
    this.shuffle();
    const remainder = times % this.size;
    const remaining = this.deck.splice(0, remainder);
    result = result.concat(remaining);
    this.discard = remaining;
    return result;
  }

  get size(): number {
    return this.deck.length + this.discard.length;
  }

  get nBlanks(): number {
    return this.deck.filter((v) => v.value === 0).length;
  }

  get nDiscardedBlanks(): number {
    return this.discard.filter((v) => v.value === 0).length;
  }

  get nCriticals(): number {
    return this.deck.filter((v) => v.critical).length;
  }

  get nDiscardedCriticals(): number {
    return this.discard.filter((v) => v.critical).length;
  }

  get nextCardEV(): number {
    const drawPileEmpty = this.deck.length === 0;
    const nextPile = drawPileEmpty ? this.discard : this.deck;
    return calculateExpectedValue(nextPile);
  }

  zeroBlanksProbability(draws: number): number {
    if (draws > this.deck.length) {
      const drafFromDeck = this.deck.length;
      const drafFromDiscard = draws - drafFromDeck;
      return hypergeometricProbability(this.deck.length, drafFromDeck, this.nBlanks, 0) * hypergeometricProbability(this.discard.length, drafFromDiscard, this.nDiscardedBlanks, 0);
    }
    return hypergeometricProbability(this.deck.length, draws, this.nBlanks, 0);
  }

  exactlyOneBlankProbability(draws: number): number {
    if (draws > this.deck.length) {
      const drafFromDeck = this.deck.length;
      const drafFromDiscard = draws - drafFromDeck;
      return hypergeometricProbability(this.deck.length, drafFromDeck, this.nBlanks, 0) * hypergeometricProbability(this.discard.length, drafFromDiscard, this.nDiscardedBlanks, 1) +
        hypergeometricProbability(this.deck.length, drafFromDeck, this.nBlanks, 1) * hypergeometricProbability(this.discard.length, drafFromDiscard, this.nDiscardedBlanks, 0);
    }
    return hypergeometricProbability(this.deck.length, draws, this.nBlanks, 1);
  }

  toString(): string {
    const summarize = (cards: MightCard[]) =>
      Object.entries(
        cards.reduce(
          (p, c) => {
            const key = c.toString();
            p[key] = p[key] ?? 0;
            p[key]++;
            return p;
          },
          {} as { [key: string]: number },
        ),
      )
        .map(([dice, count]) => `${dice}x${count}`)
        .join(' ');
    return `Deck(${this.deck.length}):
${summarize(MightDeck.sort(this.deck))}
Discard(${this.discard.length}):
${summarize(MightDeck.sort(this.discard))}`;
  }

  static sort(cards: MightCard[]): MightCard[] {
    return [...cards].sort(MightCard.compare);
  }
}
