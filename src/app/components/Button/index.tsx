import { twMerge } from 'tailwind-merge'
import type React from 'react'

import { Icon, Loading } from '@/app/components/Icon'
import type { IconProps } from '@/app/components/Icon/Icon'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  destructive?: boolean
  icon?: {
    element: (props: IconProps) => React.ReactElement,
    location?: 'left' | 'right'
  }
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export const Button = ({
  children,
  className,
  destructive,
  disabled,
  icon,
  loading,
  variant = 'primary',
  ...props
}: Props) => {
  const styles = twMerge(
    `
      active:bg-blue-500
      bg-blue-500/[0.95]
      disabled:cursor-not-allowed
      disabled:text-[#eeeeee]
      flex
      font-bold
      gap-[8px]
      h-[36px]
      hover:bg-blue-500/[0.875]
      items-center
      justify-center
      outline-none
      px-[24px]
      relative
      rounded-[8px]
      text-[1.0625rem]
      text-white
      tracking-[0.5px]
      w-fit
      whitespace-nowrap
    `,
    variant === 'primary' && destructive &&
    `
      active:bg-[#d72b0d]
      bg-[#d72b0d]/[0.95]
      hover:bg-[#d72b0d]/[0.875]
      text-white
    `,
    variant === 'secondary' &&
    `
      active:bg-blue-500/[0.2]
      bg-transparent
      border
      border-blue-500
      disabled:bg-transparent
      disabled:border-blue-500/[0.375]
      disabled:hover:bg-transparent
      disabled:text-blue-500/[0.375]
      hover:bg-blue-500/[0.1]
      text-blue-500
    `,
    variant === 'secondary' && destructive &&
    `
      active:bg-[#d72b0d]/[0.2]
      border-[#d72b0d]
      disabled:border-[#d72b0d]/[0.3]
      hover:bg-[#d72b0d]/[0.1]
      text-[#d72b0d]
    `,
    loading &&
    `
      active:bg-blue-500/[0.625]
      bg-blue-500/[0.625]
      hover:bg-blue-500/[0.625]
    `,
    icon && icon.location === 'right' ? 'flex-row' : 'flex-row-reverse',
    className
  )

  // Custom components must start with a capital letter.
  const IconElement = icon?.element

  const iconStyles = twMerge(
    'shrink-0',
    disabled && 'grayscale invert-[50%] opacity-60',
    loading && 'opacity-0'
  )

  return (
    <button {...props} className={styles} disabled={disabled || loading}>
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {IconElement && <span className={iconStyles}><IconElement /></span>}
      {loading && <Icon className="absolute" source={Loading} />}
    </button>
  )
}
