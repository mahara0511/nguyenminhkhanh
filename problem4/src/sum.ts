function assertValidN(n: number): asserts n is number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`Expected non-negative integer, received: ${n}`);
  }

  if (n > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`Input exceeds MAX_SAFE_INTEGER, received: ${n}`);
  }
}

// Iterative summation — O(n)
export const sum_to_n_a = (n: number): number => {
  assertValidN(n);

  let total: number = 0;
  for (let i: number = 1; i <= n; i++) {
    total += i;
  }
  return total;
};

// Mathematical formula — O(1)
export const sum_to_n_b = (n: number): number => {
  assertValidN(n);

  return (n * (n + 1)) / 2;
};

// Tail-recursive summation — O(n)
export const sum_to_n_c = (n: number, acc: number = 0): number => {
  assertValidN(n);

  if (n === 0) return acc;
  return sum_to_n_c(n - 1, acc + n);
};
