import MightCard from './MightCard';
import MightDice from './MightDice';

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

  get blanks(): number {
    return this.deck.filter(i => [0].includes(i.value)).length;
  }

  get crits(): number {
    return this.deck.filter(i => [true].includes(i.critical)).length;
  }

  get ev(): number {
    return this.deck.reduce((sum, current) => sum + current.value, 0)/this.deck.length;
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
