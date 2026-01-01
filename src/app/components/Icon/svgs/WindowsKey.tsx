import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const WindowsKey = ({ className, primary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[16px] shrink-0 w-[16px]', className)}
      viewBox="0 0 4875 4875"
    >
      <path
        d="M0 0h2311v2310H0zm2564 0h2311v2310H2564zM0 2564h2311v2311H0zm2564 0h2311v2311H2564"
        fill={primary}
      />
    </svg>
  )
}
