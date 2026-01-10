import { twMerge } from 'tailwind-merge'
import type React from 'react'

export type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  disabled?: boolean
  error?: boolean
}

export const Label = ({ children, className, disabled, error, ...props }: Props) => {
  return (
    <label {...props} className={twMerge('font-medium mb-[4px] text-[0.875rem] tracking-[0.25px]', disabled && 'cursor-not-allowed text-[#999999]', className, error && 'hover:text-error text-error')}>
      {children}
    </label>
  )
}
