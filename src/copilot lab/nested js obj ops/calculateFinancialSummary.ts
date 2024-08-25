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

type Node = Company | Department | Project | Budget | Transaction | Node[];

function calculateFinancialSummary(data: Company[]): Company[] {
  function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  function traverse(node: Node): {
    totalSpent: number;
    totalTransactions: number;
  } {
    let summary = { totalSpent: 0, totalTransactions: 0 };

    if (Array.isArray(node)) {
      node.forEach((item) => {
        const itemSummary = traverse(item);
        summary.totalSpent += itemSummary.totalSpent;
        summary.totalTransactions += itemSummary.totalTransactions;
      });
    } else if (typeof node === 'object' && node !== null) {
      if ((node as Budget).transactions) {
        (node as Budget).transactions.forEach((transaction) => {
          summary.totalSpent += transaction.amount;
          summary.totalTransactions += 1;
        });
      }
      Object.keys(node).forEach((key) => {
        if (key !== 'transactions') {
          const childSummary = traverse((node as any)[key]);
          summary.totalSpent += childSummary.totalSpent;
          summary.totalTransactions += childSummary.totalTransactions;
        }
      });
      if ((node as Department).projects) {
        (node as Department).totalSpent = summary.totalSpent;
        (node as Department).averageSpent = summary.totalTransactions
          ? summary.totalSpent / summary.totalTransactions
          : 0;
      }
    }

    return summary;
  }

  const dataCopy = deepCopy(data);
  traverse(dataCopy);
  return dataCopy;
}

export default calculateFinancialSummary;
