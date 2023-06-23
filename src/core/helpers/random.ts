export function generateRandomValue(min:number, max: number, numAfterDigit: number) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1, 0);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length, 0);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[], min?: number):T {
  return items[generateRandomValue(min ? min : 0, items.length - 1, 0)];
}

export function getRandomBoolean(): string {
  const BOOLEANS = ['true', 'false'];
  return getRandomItem<string>(BOOLEANS);
}
