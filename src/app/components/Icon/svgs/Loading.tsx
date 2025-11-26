import { twMerge } from 'tailwind-merge'
import type React from 'react'

import type { IconProps } from '@/app/components/Icon/Icon'

export const Loading = ({
  className,
  primary = '#ffffff'
}: IconProps): React.ReactElement => {
  className = twMerge('animate-spin h-[16px] shrink-0 w-[16px]', className)

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2 A10 10, 0, 1 1, 2 12"
        stroke={primary}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}
