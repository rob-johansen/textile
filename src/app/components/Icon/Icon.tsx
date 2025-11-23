import type React from 'react'

export type IconProps = React.SVGAttributes<HTMLOrSVGElement> & {
  primary?: string
  secondary?: string
  tertiary?: string
  quaternary?: string
}

type Props = IconProps & {
  source: (props: IconProps) => React.ReactElement
}

export const Icon = ({ source, ...props }: Props) => {
  const SourceIcon = source // JSX Element names must start with a capital letter.
  return <SourceIcon {...props} />
}
