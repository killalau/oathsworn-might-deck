import MightCard from './MightCard';

export default abstract class MightDice {
  faces: MightCard[] = [];

  roll(): MightCard {
    const rand = Math.floor(Math.random() * this.faces.length);
    return this.faces[rand];
  }

  rollN(count: number): MightCard[] {
    const result: MightCard[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.roll());
    }
    return result;
  }

  clone(): MightDice {
    const dup: MightDice = this.constructor();
    dup.faces = [...this.faces];
    return dup;
  }
}

export class WhiteDice extends MightDice {
  faces = [
    new MightCard(0),
    new MightCard(0),
    new MightCard(1),
    new MightCard(1),
    new MightCard(2),
    new MightCard(2, true),
  ];
}

export class YellowDice extends MightDice {
  faces = [
    new MightCard(0),
    new MightCard(0),
    new MightCard(1),
    new MightCard(2),
    new MightCard(3),
    new MightCard(3, true),
  ];
}

export class RedDice extends MightDice {
  faces = [
    new MightCard(0),
    new MightCard(0),
    new MightCard(2),
    new MightCard(3),
    new MightCard(3),
    new MightCard(4, true),
  ];
}

export class BlackDice extends MightDice {
  faces = [
    new MightCard(0),
    new MightCard(0),
    new MightCard(3),
    new MightCard(3),
    new MightCard(4),
    new MightCard(5, true),
  ];
}
