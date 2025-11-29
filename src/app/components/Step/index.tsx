import type { ReactElement } from 'react'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { Step as StepType } from '@/types/Step'
import { Clipboard, Terminal, Text } from '@/app/components/Icon'
import { Select } from '@/app/components/Select'
import type { IconProps } from '@/app/components/Icon/Icon'

type Props = {
  index: number
  onChangeAction: (action: Action, index: number) => void
  onChangeInput: (input: Input, index: number) => void
  onChangeValue: (value: string, index: number) => void
  step: StepType
}

export const Step = ({ index, step, ...props }: Props) => {
  let inputIcon: ((props: IconProps) => ReactElement) | undefined
  if (step.input === Input.CLIPBOARD_RUNTIME) inputIcon = Clipboard
  if (step.input === Input.COMMAND_RUNTIME) inputIcon = Terminal
  if (step.input === Input.TEXT_NOW) inputIcon = Text

  return (
    <div className="flex gap-x-[8px] items-start">
      <div className="flex gap-x-[8px] items-center relative top-[2px]">
        <span className="bg-green-700 flex font-bold items-center justify-center rounded-full size-[32px] text-white">
          {index + 1}
        </span>
        {step.action === Action.START ? (
          <span>Start with:</span>
        ) : (
          <span>select with append, replace, etc.</span>
        )}
      </div>
      <Select
        onClickOption={({ value }) => props.onChangeInput(value as Input, index)}
        options={[
          { icon: Text, name: 'Text that I will provide now', value: Input.TEXT_NOW },
          { icon: Clipboard, name: 'The text on my clipboard when I run this textile', value: Input.CLIPBOARD_RUNTIME },
          { icon: Terminal, name: 'The output of a command when I run this textile', value: Input.COMMAND_RUNTIME },
        ]}
        outerClassName={step.input ? '' : 'w-[66px]'}
        placeholder="..."
        value={step.input || ''}
        {...(inputIcon ? { icon: inputIcon } : {})}
      />
    </div>
  )
}
