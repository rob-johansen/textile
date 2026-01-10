import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const Pencil = ({ className, primary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[16px] shrink-0 w-[16px]', className)}
      fill="none"
      stroke={primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  )
}
