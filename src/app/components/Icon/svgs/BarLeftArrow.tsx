import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const BarLeftArrow = ({ className, primary = '#94a3b8', secondary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[16px] shrink-0 w-[16px]', className)}
      fill="none"
      stroke={primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M10 12l10 0" stroke={secondary} />
      <path d="M10 12l4 4" stroke={secondary} />
      <path d="M10 12l4 -4" stroke={secondary} />
      <path d="M4 4l0 16" />
    </svg>
  )
}
