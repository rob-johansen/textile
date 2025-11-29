import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const Text = ({ className, primary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[16px] shrink-0 w-[16px]', className)}
      fill="none"
      stroke={primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
      <path d="M9 15h-2"/>
      <path d="M13 12h-6"/>
      <path d="M11 9h-4"/>
    </svg>
  )
}
