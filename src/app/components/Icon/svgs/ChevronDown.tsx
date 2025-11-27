import { twMerge } from 'tailwind-merge'

import type { IconProps } from '@/app/components/Icon/Icon'

export const ChevronDown = ({
  className,
  primary = '#49505A'
}: IconProps) => {
  return (
    <svg className={twMerge('h-[20px] shrink-0 w-[20px]', className)} fill="none" viewBox="0 0 20 20">
      <path
        d="M14.9999 8L9.99994 13L4.99994 8"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.67"
      />
    </svg>
  )
}
