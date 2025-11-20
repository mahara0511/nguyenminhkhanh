# Problem 4 – Summation to n

This problem implements three different functions (`sum_to_n_a`, `sum_to_n_b`, `sum_to_n_c`) that compute the summation from **1 to n** using iterative, mathematical, and recursive approaches.

## Run Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Run the code

```bash
npx ts-node src/index.ts

```

### 3. Expect Output

```bash
sum_to_n_a(5) = 15
sum_to_n_b(5) = 15
sum_to_n_c(5) = 15
```

## 4. Performance Evaluation

| Function       | Approach     | Time Complexity | Space Complexity | Notes                                |
| -------------- | ------------ | --------------- | ---------------- | ------------------------------------ |
| **sum_to_n_a** | Loop         | O(n)            | O(1)             | Simple, reliable, slower for large n |
| **sum_to_n_b** | Math formula | O(1)            | O(1)             | Fastest, constant time               |
| **sum_to_n_c** | Recursion    | O(n)            | O(n)             | Risk of stack overflow for large n   |
