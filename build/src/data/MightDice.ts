import MightCard, { MigthColor } from './MightCard';

export default abstract class MightDice {
  faces: MightCard[] = [];
  color: MigthColor = 'white';

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

  clone(): this {
    const C = this.constructor as Constructor<this>;
    const dup = new C();
    dup.faces = [...this.faces];
    return dup;
  }
}

export class WhiteDice extends MightDice {
  color: MigthColor = 'white';
  faces = [
    new MightCard(0, false, 'white'),
    new MightCard(0, false, 'white'),
    new MightCard(1, false, 'white'),
    new MightCard(1, false, 'white'),
    new MightCard(2, false, 'white'),
    new MightCard(2, true, 'white'),
  ];
}

export class YellowDice extends MightDice {
  color: MigthColor = 'yellow';
  faces = [
    new MightCard(0, false, 'yellow'),
    new MightCard(0, false, 'yellow'),
    new MightCard(1, false, 'yellow'),
    new MightCard(2, false, 'yellow'),
    new MightCard(3, false, 'yellow'),
    new MightCard(3, true, 'yellow'),
  ];
}

export class RedDice extends MightDice {
  color: MigthColor = 'red';
  faces = [
    new MightCard(0, false, 'red'),
    new MightCard(0, false, 'red'),
    new MightCard(2, false, 'red'),
    new MightCard(3, false, 'red'),
    new MightCard(3, false, 'red'),
    new MightCard(4, true, 'red'),
  ];
}

export class BlackDice extends MightDice {
  color: MigthColor = 'black';
  faces = [
    new MightCard(0, false, 'black'),
    new MightCard(0, false, 'black'),
    new MightCard(3, false, 'black'),
    new MightCard(3, false, 'black'),
    new MightCard(4, false, 'black'),
    new MightCard(5, true, 'black'),
  ];
}
