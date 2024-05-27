import { MightDice, MightDiceFace } from './MightDice';

export class MightDeck {
  dice: MightDice;
  deck: MightDiceFace[];
  discard: MightDiceFace[];

  constructor(
    dice: MightDice,
    deck?: MightDiceFace[],
    discard?: MightDiceFace[],
  ) {
    this.dice = dice;
    this.deck = deck
      ? [...deck]
      : [...dice.faces, ...dice.faces, ...dice.faces];
    this.discard = discard ? [...discard] : [];
  }

  clone(): MightDeck {
    const dup = new MightDeck(this.dice);
    dup.deck = this.deck.map((d) => d.clone());
    dup.discard = this.discard.map((d) => d.clone());
    return dup;
  }

  sort(): MightDeck {
    this.deck.sort(MightDiceFace.compare);
    this.discard.sort(MightDiceFace.compare);
    return this;
  }

  shuffle(): MightDeck {
    this.deck.sort(() => (Math.random() >= 0.5 ? 1 : -1));
  }

  toString(): string {
    const sorted = this.clone().sort();
    const summarize = (cards: MightDiceFace[]) =>
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
${summarize(sorted.deck)}
Discard(${this.discard.length}):
${summarize(sorted.discard)}`;
  }
}
