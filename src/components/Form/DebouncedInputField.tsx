import {  forwardRef, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { InputField, type InputFieldProps } from './InputField';

type DebouncedInputFieldProps = InputFieldProps & {
  defaultValue?: string;
  onDebouncedChange?: (value: string) => void;
  debounceDelay?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DebouncedInputField = forwardRef<HTMLInputElement, DebouncedInputFieldProps>(
  (props: DebouncedInputFieldProps, ref) => {
    const { defaultValue = '', onDebouncedChange, debounceDelay = 500, onChange, ...restProps } = props;
    const [value, setValue] = useState<string>(defaultValue);
    const debouncedValue = useDebounce<string>(value, debounceDelay);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChange?.(event);
    };

    useEffect(() => {
      if (debouncedValue !== defaultValue) {
        onDebouncedChange?.(debouncedValue);
      }
    }, [debouncedValue]);

    return <InputField ref={ref} value={value} onChange={handleChange} {...restProps} />;
  }
);


