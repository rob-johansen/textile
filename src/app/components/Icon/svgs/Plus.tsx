import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const Plus = ({ className, primary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[16px] shrink-0 w-[16px]', className)}
      fill="none"
      stroke={primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M12 5l0 14"/>
      <path d="M5 12l14 0"/>
    </svg>
  )
}
