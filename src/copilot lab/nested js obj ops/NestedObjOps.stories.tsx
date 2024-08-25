import { Meta } from '@storybook/react';
import FinancialSummaryTest from './FinancialSummaryTest';

const meta: Meta = {
  title: 'Copilot Lab/Nested JS Objects Operations',
  component: FinancialSummaryTest,
};

export default meta;

const Template = () => {
  return <FinancialSummaryTest />;
};

export const Primary = Template.bind({});
