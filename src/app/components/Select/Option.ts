import type { ReactElement } from 'react'

import type { IconProps } from '@/app/components/Icon/Icon'

export type Option = {
  icon?: (props: IconProps) => ReactElement
  name: string
  value: string
}
