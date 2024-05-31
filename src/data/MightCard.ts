export default class MightCard {
  value: number;
  critical: boolean;

  constructor(value: number, critical: boolean = false) {
    this.value = value;
    this.critical = critical;
  }

  clone(): MightCard {
    return new MightCard(this.value, this.critical);
  }

  toString(): string {
    return this.critical ? `{${this.value}}` : `[${this.value}]`;
  }

  static compare(a: MightCard, b: MightCard): number {
    const diff = a.value - b.value;
    if (diff !== 0) return diff;
    return a.critical && !b.critical ? 1 : !a.critical && b.critical ? -1 : 0;
  }
}
