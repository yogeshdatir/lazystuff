import { Meta } from '@storybook/react';
import { TagInput } from '.';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/TagInput',
  component: TagInput,
};

export default meta;

const Template = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <TagInput value={tags} onChange={(tags) => setTags(tags)} />
    </>
  );
};

export const Primary = Template.bind({});
