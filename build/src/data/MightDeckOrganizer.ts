import MightDeck from './MightDeck';
import { BlackDice, RedDice, WhiteDice, YellowDice } from './MightDice';

export type MightCardsSelection = {
  white: number;
  yellow: number;
  red: number;
  black: number;
};

export const defaultMightCardsSelection: MightCardsSelection = {
  white: 0,
  yellow: 0,
  red: 0,
  black: 0,
};

export default class MightDeckOrganizer {
  white: MightDeck;
  yellow: MightDeck;
  red: MightDeck;
  black: MightDeck;

  constructor(
    shuffle: boolean = false,
    white?: MightDeck,
    yellow?: MightDeck,
    red?: MightDeck,
    black?: MightDeck,
  ) {
    this.white = white ?? new MightDeck(new WhiteDice());
    this.yellow = yellow ?? new MightDeck(new YellowDice());
    this.red = red ?? new MightDeck(new RedDice());
    this.black = black ?? new MightDeck(new BlackDice());
    if (shuffle) {
      this.white.shuffle();
      this.yellow.shuffle();
      this.red.shuffle();
      this.black.shuffle();
    }
  }

  clone(): MightDeckOrganizer {
    return new MightDeckOrganizer(
      false,
      this.white.clone(),
      this.yellow.clone(),
      this.red.clone(),
      this.black.clone(),
    );
  }
}
