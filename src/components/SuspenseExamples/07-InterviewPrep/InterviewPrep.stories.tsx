import type { Meta, StoryObj } from '@storybook/react';
import { InterviewPrepExample } from './InterviewPrepExample';

const meta: Meta<typeof InterviewPrepExample> = {
  title: 'Suspense Examples/07 - Interview Prep',
  component: InterviewPrepExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## React Suspense Interview Preparation

A comprehensive collection of interview questions and detailed answers about React Suspense.

### What's Included

**20 Interview Questions** covering:
- **Basics** - Core concepts and how Suspense works
- **Use Cases** - When and why to use Suspense
- **Error Handling** - Managing errors with Error Boundaries
- **Advanced Patterns** - Concurrent rendering, useTransition, progressive loading
- **React Query Integration** - Using Suspense with data fetching libraries
- **Best Practices** - Common mistakes and testing strategies
- **Performance** - How Suspense improves app performance
- **Server Components** - Suspense in server-side rendering
- **Comparison** - How Suspense compares to alternatives

### How to Use

1. **Filter by Category** - Click category buttons to focus on specific topics
2. **Click Questions** - Expand to see detailed, interview-ready answers
3. **Practice Speaking** - Read answers out loud to prepare for verbal interviews
4. **Understand Trade-offs** - Answers include when to use and when NOT to use Suspense

### Interview Tips

All answers are written in a conversational style that mirrors how you would explain concepts verbally in an interview. They focus on:
- Clear explanations without jargon
- Real-world use cases and examples
- Trade-offs and alternatives
- Connecting related concepts
- Demonstrating deep understanding

### Study Approach

- Start with Basics category to build foundation
- Progress through Use Cases and Error Handling
- Master Advanced Patterns for senior-level discussions
- Review Best Practices and Performance for practical experience
- Practice explaining answers in your own words
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InterviewPrepExample>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive interview preparation with 20 common Suspense questions. Click any question to reveal a detailed, interview-ready answer.'
      }
    }
  }
};
