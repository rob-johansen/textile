import { twMerge } from 'tailwind-merge'
import type React from 'react'

import { Modifier } from '@/types/Shortcut'
import type { Keyboard } from '@/types/Keyboard'

type Props = React.HTMLProps<HTMLDivElement> & Keyboard

export const ShortcutText = ({ className, first, placeholder, second }: Props) => {
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

  if (second) {
    if (second.mod1 === Modifier.Alt) secondMod1 = mac ? '⌥' : '⎇'
    if (second.mod1 === Modifier.Control) secondMod1 = mac ? '⌃' : '^'
    if (second.mod1 === Modifier.Meta) secondMod1 = mac ? '⌘' : '⊞'

    if (second.mod2 === Modifier.Alt) secondMod2 = mac ? '⌥' : '⎇'
    if (second.mod2 === Modifier.Control) secondMod2 = mac ? '⌃' : '^'
    if (second.mod2 === Modifier.Meta) secondMod2 = mac ? '⌘' : '⊞'
    if (second.mod2 === Modifier.Shift) secondMod2 = '⇧'
  }

  const showPlaceholder = placeholder && !first.mod1 && !first.mod2 && !first.key && !second?.mod1 && !second?.mod2 && !second?.key
  const showPlus1 = Boolean(first.mod1) || Boolean(!first.mod1 && first.mod2) || Boolean(first.key)
  const showPlus2 = Boolean(first.mod1 && first.mod2) || Boolean(first.mod2)
  const showPlus3 = Boolean(second)
  const showPlus4 = Boolean(second?.mod1)
  const showPlus5 = Boolean(second?.mod2)

  return (
    <div className={twMerge('', className)}>
      {showPlaceholder && (
        <span className="text-[0.875rem] text-slate-500">
          {placeholder}
        </span>
      )}
      <span>{Boolean(first.mod1) && firstMod1}</span>
      <span className="text-gray-500">{showPlus1 && '+'}</span>
      <span>{Boolean(first.mod2) && firstMod2}</span>
      <span className="text-gray-500">{showPlus2 && '+'}</span>
      <span>{Boolean(first.key) && first.key}</span>
      <span className="mx-[6px] relative text-gray-500 top-[-1px]">{showPlus3 && '+'}</span>
      <span>{Boolean(second?.mod1) && secondMod1}</span>
      <span className="text-gray-500">{showPlus4 && '+'}</span>
      <span>{Boolean(second?.mod2) && secondMod2}</span>
      <span className="text-gray-500">{showPlus5 && '+'}</span>
      <span>{Boolean(second?.key) && second?.key}</span>
    </div>
  )
}
