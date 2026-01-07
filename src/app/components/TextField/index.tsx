import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { InputHTMLAttributes, ReactElement, Ref } from 'react'

import { Label } from '@/app/components/Label'
import type { IconProps } from '@/app/components/Icon/Icon'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  hideError?: boolean
  icon?: (props: IconProps) => ReactElement
  iconLocation?: 'left' | 'right'
  iconPrimary?: string
  iconSecondary?: string
  label?: string
  onClickIcon?: () => void
  outerClassName?: string
}

export const TextField = forwardRef(
  (
    { className, error, hideError = false, icon, iconLocation, iconPrimary, iconSecondary, label, onClickIcon, outerClassName, ...props }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    const outerStyles = twMerge(
      `
        flex
        flex-col
        relative
      `,
      outerClassName
    )

    const inputStyles = twMerge(
      `
        bg-white
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
        h-[36px]
        hover:shadow-[0_0_4px_rgba(0,0,0,0.175)]
        max-w-full
        outline-none
        placeholder-gray-400
        pl-[16px]
        pr-[8px]
        py-[7px]
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
      icon && iconLocation !== 'right' && 'pl-[32px]',
      icon && iconLocation === 'right' && 'pr-[26px]',
      className
    )

    // If `icon` is defined, it's a component that must be capitalized.
    const Icon = icon

    return (
      <div className={outerStyles}>
        {label && (
          <Label disabled={props.disabled} error={!!error} htmlFor={props.id}>
            {label}
          </Label>
        )}
        <input {...props} className={inputStyles} ref={ref} />
        {Icon && (
          <button
            className={`absolute outline-none size-[16px] ${iconLocation === 'right' ? 'right-[8px]' : 'left-[10px]'} ${label ? 'top-[38px]' : 'top-[10px]'} ${onClickIcon ? 'cursor-pointer' : 'pointer-events-none'}`}
            onClick={() => {
              if (onClickIcon) onClickIcon()
            }}
            type="button"
          >
            <Icon
              className="size-[16px]"
              primary={iconPrimary}
              secondary={iconSecondary}
            />
          </button>
        )}
        {!hideError && (
          <p className={twMerge('h-[18px] mb-[8px] mt-[2px] text-[0.75rem] text-error text-right tracking-[0.4px]', error ? 'visible' : 'invisible')}>
            {error}
          </p>
        )}
      </div>
    )
})

TextField.displayName = 'TextField'
