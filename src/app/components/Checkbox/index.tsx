import React, { forwardRef } from 'react';
import type { Ref } from 'react';
import { twMerge } from 'tailwind-merge';

import { Label } from '@/app/components/Label'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  label?: string
}

const getCheckIcon = ({
  checked,
  disabled,
}: Partial<CheckboxProps>): string => {
  let fill = '%23fafafa';
  if (checked && disabled) fill = '%23999999';
  if (!checked && disabled) fill = '%23F7F7F7';
  if (checked && !disabled) fill = '%23155dcf';

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='${fill}'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E`;
};

export const Checkbox = forwardRef(
  (
    {className, error, label, ...props}: CheckboxProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const checked = Boolean(props.checked);

    return (
      <Label
        className={twMerge('flex group hover:text-blue-600 items-center text-neutral-900 w-fit', props.disabled && 'hover:text-[#999999]', className)}
        disabled={props.disabled}
        error={error}
      >
        <input
          {...props}
          className={twMerge('appearance-none bg-neutral-50 border-[1px] border-slate-400 checked:bg-blue-600/[0.125] checked:border-blue-500 disabled:bg-neutral-50 disabled:border-slate-400 disabled:cursor-not-allowed disabled:group-hover:shadow-[none] disabled:hover:border-[none] disabled:shadow-none group-hover:shadow-[0_0_0_3px_rgba(40,44,159,0.05)] h-[24px] hover:border-blue-500 rounded transition w-[24px]', label && 'mr-[8px]', error && 'border-error checked:border-error hover:border-error')}
          ref={ref}
          style={{
            backgroundImage: `url("${getCheckIcon({
              ...props,
              checked,
            })}")`,
          }}
          checked={checked}
          type="checkbox"
        />
        {label}
      </Label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
