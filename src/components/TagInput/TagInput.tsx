'use client';

import * as React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

export interface TagInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value: string[] | undefined;
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  value = [],
  onChange,
  placeholder = 'Add tag...',
  className,
  ...rest
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
    // Immediate focus enforcement
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <InputGroup className={className ?? 'h-auto min-h-10 flex-wrap py-1.5'}>
      {/* 1. Place Input first in the DOM for proper shadcn focus tracking */}
      <InputGroupInput
        {...rest}
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => inputValue && addTag(inputValue)}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[100px]"
      />

      {/* 2. Addon goes second in DOM, but align handles visual placement at start */}
      {value.length > 0 && (
        <InputGroupAddon align="inline-start" className="flex-wrap gap-1.5">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                // block mousedown to avoid blurring the input field instantly
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
