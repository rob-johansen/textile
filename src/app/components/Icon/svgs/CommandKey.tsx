import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const CommandKey = ({ className, primary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[20px] shrink-0 w-[20px]', className)}
      fill="none"
      stroke={primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" />
    </svg>
  )
}
