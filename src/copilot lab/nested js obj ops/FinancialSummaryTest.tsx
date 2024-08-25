// FinancialSummaryTest.tsx
import React, { useEffect, useState } from 'react';
import calculateFinancialSummary from './calculateFinancialSummary';

interface Transaction {
  id: number;
  amount: number;
  date: string;
}

interface Budget {
  transactions: Transaction[];
}

interface Project {
  projectName: string;
  budget: Budget;
}

interface Department {
  name: string;
  projects: Project[];
  totalSpent?: number;
  averageSpent?: number;
}

interface Company {
  company: string;
  departments: Department[];
}

const FinancialSummaryTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const runTests = async () => {
      const response = await import('./financialData.json');
      const financialData: Company[] = response;

      const updatedFinancialData = calculateFinancialSummary(financialData);
      console.log({ updatedFinancialData });

      const results: string[] = [];

      // Test 1: Check total spent and average spent at the department level
      if (updatedFinancialData[0].departments[0].totalSpent === 700000) {
        results.push('Test 1 Passed');
      } else {
        results.push('Test 1 Failed');
      }

      if (updatedFinancialData[0].departments[0].averageSpent === 175000) {
        results.push('Test 1 Passed');
      } else {
        results.push('Test 1 Failed');
      }

      // Test 2: Check total spent and average spent at another department level
      if (updatedFinancialData[0].departments[1].totalSpent === 250000) {
        results.push('Test 2 Passed');
      } else {
        results.push('Test 2 Failed');
      }

      if (updatedFinancialData[0].departments[1].averageSpent === 62500) {
        results.push('Test 2 Passed');
      } else {
        results.push('Test 2 Failed');
      }

      // Edge Case 1: Empty data
      const emptyData: Company[] = [];
      const emptySummary = calculateFinancialSummary(emptyData);
      if (emptySummary.length === 0) {
        results.push('Edge Case 1 Passed');
      } else {
        results.push('Edge Case 1 Failed');
      }

      // Edge Case 2: No transactions
      const noTransactionsData: Company[] = [
        {
          company: 'EmptyCorp',
          departments: [
            {
              name: 'EmptyDept',
              projects: [
                {
                  projectName: 'EmptyProject',
                  budget: {
                    transactions: [],
                  },
                },
              ],
            },
          ],
        },
      ];
      const noTransactionsSummary =
        calculateFinancialSummary(noTransactionsData);
      if (noTransactionsSummary[0].departments[0].totalSpent === 0) {
        results.push('Edge Case 2 Passed');
      } else {
        results.push('Edge Case 2 Failed');
      }

      if (noTransactionsSummary[0].departments[0].averageSpent === 0) {
        results.push('Edge Case 2 Passed');
      } else {
        results.push('Edge Case 2 Failed');
      }

      setTestResults(results);
    };

    runTests();
  }, []);

  return (
    <div>
      <h1>Financial Summary Test Results</h1>
      <ul>
        {testResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialSummaryTest;
