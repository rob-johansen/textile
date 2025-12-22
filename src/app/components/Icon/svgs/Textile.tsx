import { twMerge } from 'tailwind-merge'

import { IconProps } from '@/app/components/Icon/Icon'

export const Textile = ({ className, primary = '#000000' }: IconProps) => {
  return (
    <svg
      className={twMerge('h-[16px] rotate-45 shrink-0 w-[16px]', className)}
      viewBox="0 0 32 32"
    >
      <path
        d="M18,13h-4V2h4V13z M26,11h-4v10h4V11z M26,27h-4v3h4V27z M26,2h-4v3h4V2z M18,19h-4v11h4V19z M21,14H11v4h10V14z M30,22H19v4h11V22z M30,6H19v4h11V6z M10,11H6v10h4V11z M10,27H6v3h4V27z M10,2H6v3h4V2z M13,22H2v4h11V22z M13,6H2v4h11V6z M5,14H2v4h3V14z M30,14h-3v4h3V14z"
        fill={primary}
      />
    </svg>
  )
}
