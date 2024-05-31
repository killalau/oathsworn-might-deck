export class MightDiceFace {
  value: number;
  critical: boolean;

  constructor(value: number, critical: boolean = false) {
    this.value = value;
    this.critical = critical;
  }

  clone(): MightDiceFace {
    return new MightDiceFace(this.value, this.critical);
  }

  toString(): string {
    return this.critical ? `{${this.value}}` : `[${this.value}]`;
  }

  static compare(a: MightDiceFace, b: MightDiceFace): number {
    const diff = a.value - b.value;
    if (diff !== 0) return diff;
    return a.critical && !b.critical ? 1 : !a.critical && b.critical ? -1 : 0;
  }
}

export abstract class MightDice {
  faces: MightDiceFace[] = [];

  roll(): MightDiceFace {
    const rand = Math.floor(Math.random() * this.faces.length);
    return this.faces[rand];
  }

  rollN(count: number): MightDiceFace[] {
    const result: MightDiceFace[] = [];
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
    new MightDiceFace(0),
    new MightDiceFace(0),
    new MightDiceFace(1),
    new MightDiceFace(1),
    new MightDiceFace(2),
    new MightDiceFace(2, true),
  ];
}

export class YellowDice extends MightDice {
  faces = [
    new MightDiceFace(0),
    new MightDiceFace(0),
    new MightDiceFace(1),
    new MightDiceFace(2),
    new MightDiceFace(3),
    new MightDiceFace(3, true),
  ];
}

export class RedDice extends MightDice {
  faces = [
    new MightDiceFace(0),
    new MightDiceFace(0),
    new MightDiceFace(2),
    new MightDiceFace(3),
    new MightDiceFace(3),
    new MightDiceFace(4, true),
  ];
}

export class BlackDice extends MightDice {
  faces = [
    new MightDiceFace(0),
    new MightDiceFace(0),
    new MightDiceFace(3),
    new MightDiceFace(3),
    new MightDiceFace(4),
    new MightDiceFace(5, true),
  ];
}
