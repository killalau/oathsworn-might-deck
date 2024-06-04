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
    white?: MightDeck,
    yellow?: MightDeck,
    red?: MightDeck,
    black?: MightDeck,
  ) {
    this.white = white ?? new MightDeck(new WhiteDice());
    this.yellow = yellow ?? new MightDeck(new YellowDice());
    this.red = red ?? new MightDeck(new RedDice());
    this.black = black ?? new MightDeck(new BlackDice());
  }

  clone(): MightDeckOrganizer {
    return new MightDeckOrganizer(
      this.white.clone(),
      this.yellow.clone(),
      this.red.clone(),
      this.black.clone(),
    );
  }
}
