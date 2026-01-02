import type React from 'react'

import { Modifier } from '@/types/Shortcut'
import type { Keyboard } from '@/types/Keyboard'

type Props = React.HTMLProps<HTMLDivElement> & Keyboard

export const ShortcutText = ({ className, first, second }: Props) => {
  let firstMod1 = ''
  let firstMod2 = ''
  let secondMod1 = ''
  let secondMod2 = ''
  const mac = window.main.platform === 'darwin'

  if (first.mod1 === Modifier.Alt) firstMod1 = mac ? '⌥' : '⎇'
  if (first.mod1 === Modifier.Control) firstMod1 = mac ? '⌃' : '^'
  if (first.mod1 === Modifier.Meta) firstMod1 = mac ? '⌘' : '⊞'

  if (first.mod2 === Modifier.Alt) firstMod2 = mac ? '⌥' : '⎇'
  if (first.mod2 === Modifier.Control) firstMod2 = mac ? '⌃' : '^'
  if (first.mod2 === Modifier.Meta) firstMod2 = mac ? '⌘' : '⊞'
  if (first.mod2 === Modifier.Shift) firstMod2 = '⇧'

  return (
    <div className={className}>
      <span>{first.mod1 && `${firstMod1}+`}</span>
      <span>{first.mod1 && first.mod2 && `${firstMod2}+`}</span>
      <span>{first.mod1 && first.key && `${first.key}`}</span>
    </div>
  )
}
