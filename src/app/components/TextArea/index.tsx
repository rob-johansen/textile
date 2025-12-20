import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { TextareaHTMLAttributes, Ref } from 'react'

import { Label } from '@/app/components/Label'

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
  hideError?: boolean
  label?: string
  outerClassName?: string
}

export const TextArea = forwardRef(
  (
    { className, error, hideError = false, label, outerClassName, ...props }: Props,
    ref: Ref<HTMLTextAreaElement>
  ) => {
  return (
    <div className={twMerge('flex flex-col', outerClassName)}>
      {label && (
        <Label disabled={props.disabled} error={!!error} htmlFor={props.id}>
          {label}
        </Label>
      )}
      <textarea
        {...props}
        className={twMerge(`
          border-[1px]
          border-slate-400
          cursor-text
          disabled:bg-[#aaaaaa]/[.05]
          disabled:border-[#3c3c3c]
          disabled:cursor-not-allowed
          disabled:hover:border-slate-400
          disabled:shadow-none
          disabled:text-[#999999]
          focus:border-blue-500
          focus:shadow-[0_0_4px_rgba(96,165,250,0.3)]
          hover:shadow-[0_0_4px_rgba(0,0,0,0.175)]
          outline-none
          pb-[15px]
          placeholder-gray-400
          px-[15px]
          py-[12px]
          resize-none
          rounded
          text-[1rem]
          text-neutral-800
        `,
          error && `
            border-error
            disabled:hover:border-error
            focus:border-error
            focus:shadow-[0_0_2px_rgba(215,43,13,0.3)]
            hover:border-error
            hover:shadow-[0_0_2px_rgba(215,43,13,0.3)]
        `,
          className
        )}
        ref={ref}
      />
      {!hideError && (
        <p className={twMerge('h-[18px] mt-[2px] text-[0.75rem] text-error text-right tracking-[0.4px]', error ? 'visible' : 'invisible')}>
          {error}
        </p>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'
