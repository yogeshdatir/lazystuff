# Financial Data Summary

## Overview

This project provides a function to calculate the total and average spent values at the department level of a nested financial data structure. The function processes an array of company objects, each containing nested departments, projects, and transactions.

## Files

- `financialData.json`: Contains the input JSON data representing the financial records.
- `calculateFinancialSummary.ts`: Contains the function to calculate the financial summary.
- `testCalculateFinancialSummary.ts`: Contains test cases to validate the function.

## Function Explanation

The `calculateFinancialSummary` function performs the following steps:

1. **Deep Copy**: Creates a deep copy of the input data to avoid mutating the original data.
2. **Traversal**: Recursively traverses the nested structure to calculate the total and average spent values.
3. **Summing Values**: Accumulates the total spent by summing the `amount` values from the `transactions` arrays and counts the number of transactions.
4. **Updating Nodes**: Updates each department node in the copied data with `totalSpent` and `averageSpent` properties.

### Example Usage

```typescript
import calculateFinancialSummary from './calculateFinancialSummary';
import * as fs from 'fs';

const financialData: Company[] = JSON.parse(
  fs.readFileSync('financialData.json', 'utf8')
);
const updatedFinancialData = calculateFinancialSummary(financialData);

console.log(JSON.stringify(updatedFinancialData, null, 2));
```
