export function generateRandomValue(min:number, max: number, numAfterDigit: number | typeof NaN) {
  if ((!Number.isFinite(min) || !Number.isFinite(max)) || (min < 0 || max < 0)) {
    return NaN;
  }

  const lowerBound = Math.min(min, max);
  const upperBound = Math.max(min, max);
  return +(Math.random() * (upperBound - lowerBound) + lowerBound).toFixed(numAfterDigit);
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
