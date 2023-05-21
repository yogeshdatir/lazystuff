import InputFieldComponent from './InputField';
import CheckboxComponent from '../../../Checkbox';

export default {
  title: 'Inputs/InputField',
  component: InputFieldComponent,
};

const argTypes = {
  label: {
    name: 'Name of the arg/prop',
    type: { name: 'string', required: false },
    defaultValue: 'Hello',
    description: 'overwritten description',
    table: {
      type: {
        summary: 'something short',
        detail: 'something really really long',
      },
      defaultValue: { summary: 'Hello', detail: 'detail' },
    },
    control: {
      type: null,
    },
  },
  value: {
    table: {
      type: {
        summary: 'string|number|madeUpType',
      },
    },
    control: {
      type: 'text',
    },
  },
};

export const InputField = {
  render: (args) => <InputFieldComponent label="Name" {...args} />,
  args: { name: '', placeholder: 123 },
  argTypes,
};

export const Checkbox = {
  render: (args) => <CheckboxComponent />,
};
