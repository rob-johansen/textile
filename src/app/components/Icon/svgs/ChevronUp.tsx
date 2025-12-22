import { twMerge } from 'tailwind-merge'

import type { IconProps } from '@/app/components/Icon/Icon'

export const ChevronUp = ({
  className,
  primary = '#49505A'
}: IconProps) => {
  return (
    <svg
      className={twMerge('h-[20px] shrink-0 w-[20px]', className)}
      fill="none"
      stroke={primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.67"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M6 15l6 -6l6 6"/>
    </svg>
  )
}
