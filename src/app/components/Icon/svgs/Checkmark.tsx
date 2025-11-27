import { twMerge } from 'tailwind-merge'

import type { IconProps } from '@/app/components/Icon/Icon'

export const Checkmark = ({
  className,
  primary = '#3b82f6',
}: IconProps) => {
  return (
    <svg className={twMerge('h-[20px] shrink-0 w-[20px]', className)} viewBox="0 0 512 512">
      <path
        d="M416 128L192 384l-96-96"
        fill="none"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  )
}
