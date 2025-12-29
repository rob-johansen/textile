import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'

import { Action } from '@/types/Action'
import { Button } from '@/app/components/Button'
import {
  BarLeftArrow,
  ChevronDown,
  ChevronUp,
  Clipboard,
  ClipboardCheck,
  Close,
  FindReplace,
  Icon,
  Plus,
  RightArrowBar,
  Terminal,
  Text
} from '@/app/components/Icon'
import { Input } from '@/types/Input'
import { Select } from '@/app/components/Select'
import { StepStore } from './Store'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextArea } from '@/app/components/TextArea'
import { TextField } from '@/app/components/TextField'
import type { Step as StepType } from '@/types/Step'

type Props = {
  index: number
  step: StepType
}

export const Step = observer((props: Props) => {
  const root = useContext(StoreContext)
  const [store] = useState(() => new StepStore(root))

  const { index, step } = props
  const questionId = `question${index}`
  const valueId = `value${index}`

  let actionIcon
  if (step.action === Action.APPEND) actionIcon = RightArrowBar
  if (step.action === Action.PREPEND) actionIcon = BarLeftArrow
  if (step.action === Action.REPLACE) actionIcon = FindReplace
  if (step.action === Action.COPY) actionIcon = ClipboardCheck
  if (step.action === Action.SHOW) actionIcon = Text

  let inputIcon
  if (step.input === Input.CLIPBOARD_RUNTIME) inputIcon = Clipboard
  if (step.input === Input.COMMAND_RUNTIME) inputIcon = Terminal
  if (step.input === Input.TEXT_NOW) inputIcon = Text

  useEffect(() => {
    const question = document.getElementById(questionId)
    const value = document.getElementById(valueId)

    if (question && value) {
      value.style.width = `${question.offsetWidth}px`
      setTimeout(() => {
        value.focus()
      }, 10)
    }
  }, [questionId, step.input, valueId])

  return (
    <div className="flex flex-col w-fit" id={`step${index}`}>
      <div className={`flex gap-x-[8px] items-start ${index === 0 && 'ml-[120px]'}`}>
        {store.showDeleteMoveButtons(index) && (
          <div className="flex gap-x-[8px] h-[36px] items-center ml-[20px] mr-[12px]">
            <Button
              className="px-[0] w-[36px]"
              destructive
              onClick={() => store.onClickDeleteStep(index)}
              title="Delete this step"
              variant="secondary"
            >
              <Icon className="size-[22px]" primary="#d72b0d" source={Close} />
            </Button>
            <div>
              <Button
                className="border-b-[0] h-[18px] px-[0] rounded-b-none w-[36px]"
                disabled={store.moveUpDisabled(index)}
                onClick={() => store.onClickMoveUp(index)}
                title="Move this step up"
                variant="secondary"
              >
                <Icon className={store.moveUpDisabled(index) ? 'opacity-50' : ''} primary="#3b82f6" source={ChevronUp} />
              </Button>
              <Button
                className="border-t-blue-500/[0.375] h-[18px] px-[0] rounded-t-none w-[36px]"
                disabled={store.moveDownDisabled(index)}
                onClick={() => store.onClickMoveDown(index)}
                title="Move this step down"
                variant="secondary"
              >
                <Icon className={store.moveDownDisabled(index) ? 'opacity-50' : ''} primary="#3b82f6" source={ChevronDown} />
              </Button>
            </div>
          </div>
        )}
        <div className="flex gap-x-[8px] items-center" id={questionId}>
          <div className="flex gap-x-[8px] items-center relative self-start top-[2px]">
            <div className="bg-gradient-to-br flex font-bold from-[#4568dc] from-[-0.27%] items-center justify-center rounded-full size-[32px] text-white to-[#b06ab3] to-[134.14%]">
              {index + 1}
            </div>
            {step.action === Action.START ? (
              <span>Start with:</span>
            ) : (
              <span>Then:</span>
            )}
          </div>
          <div className="flex gap-x-[8px] items-center">
            {store.showActionSelect(index) && (
              <Select
                error={step.error.action}
                onClickOption={({ value }) => store.onChangeAction(step, value as Action)}
                options={[
                  { icon: RightArrowBar, name: 'append', value: Action.APPEND },
                  { icon: BarLeftArrow, name: 'prepend', value: Action.PREPEND },
                  { icon: FindReplace, name: 'replace', value: Action.REPLACE },
                  { icon: ClipboardCheck, name: 'copy the result to my clipboard', value: Action.COPY },
                  { icon: Text, name: 'show the result', value: Action.SHOW },
                ]}
                outerClassName={step.action ? '' : 'w-[66px]'}
                placeholder="..."
                value={step.action}
                {...(actionIcon ? { icon: actionIcon } : {})}
              />
            )}
            {store.showInputSelect(index) && (
              <Select
                error={step.error.input}
                onClickOption={({ value }) => store.onChangeInput(step, value as Input)}
                options={[
                  { icon: Text, name: 'text that I will provide now', value: Input.TEXT_NOW },
                  { icon: Clipboard, name: 'the text on my clipboard when I run this textile', value: Input.CLIPBOARD_RUNTIME },
                  { icon: Terminal, name: 'the output of a command when I run this textile', value: Input.COMMAND_RUNTIME },
                ]}
                outerClassName={step.input ? '' : 'w-[66px]'}
                placeholder="..."
                value={step.input}
                {...(inputIcon ? { icon: inputIcon } : {})}
              />
            )}
            {store.showReplaceInputs(step) && (
              <div className="flex gap-x-[8px] items-center">
                <TextField
                  className="font-[JetBrains]"
                  error={step.error.value}
                  onChange={(event) => store.onChangeValue(step, event.target.value)}
                  outerClassName={'w-[184px]'}
                  placeholder="..."
                  spellCheck={false}
                  value={step.value}
                />
                <span className="relative self-start top-[7px]">
                  with
                </span>
                <TextField
                  className="font-[JetBrains] text-[0.875rem]"
                  error={step.error.replacement}
                  onChange={(event) => store.onChangeMetadata(step, event.target.value)}
                  outerClassName={'w-[184px]'}
                  placeholder="..."
                  spellCheck={false}
                  value={step.metadata.replacement ?? ''}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {store.showCommandInput(step) && (
        <TextField
          className="font-[JetBrains] text-[0.875rem]"
          error={step.error.value}
          id={valueId}
          onChange={(event) => store.onChangeValue(step, event.target.value)}
          outerClassName="ml-[120px]"
          placeholder={step.input === Input.TEXT_NOW ? 'Enter the text' : 'Enter the command'}
          spellCheck={false}
          value={step.value}
        />
      )}
      {store.showTextArea(step) && (
        <TextArea
          className="field-sizing-content whitespace-pre font-[JetBrains] text-[0.875rem]"
          error={step.error.value}
          id={valueId}
          onChange={(event) => store.onChangeValue(step, event.target.value)}
          outerClassName="ml-[120px]"
          placeholder={step.input === Input.TEXT_NOW ? 'Enter the text' : 'Enter the command'}
          spellCheck={false}
          value={step.value}
        />
      )}
      {store.showArgInputs(step) && (
        step.metadata.args?.map((arg, index) => {
          const argId = `arg${index}`

          return (
            <div
              className="flex gap-x-[8px] items-start"
              key={arg.id}
            >
              <TextField
                className="font-[JetBrains] text-[0.875rem]"
                id={argId}
                onChange={(event) => store.onChangeArg(step, index, event.target.value)}
                outerClassName="ml-[120px] w-full"
                placeholder={`Enter ${index === 0 ? 'the first' : 'another'} command argument (optional)`}
                spellCheck={false}
                value={arg.value}
              />
              <Button
                className="px-[0] shrink-0 w-[36px]"
                onClick={() => store.onClickAddArg(step)}
                title="Add an argument"
                variant="secondary"
              >
                <Icon className="size-[20px]" primary="#3b82f6" source={Plus} />
              </Button>
              <Button
                className="px-[0] shrink-0 w-[36px]"
                destructive
                disabled={index === 0}
                onClick={() => store.onClickDeleteArg(step, index)}
                title="Delete this argument"
                variant="secondary"
              >
                <Icon className={`size-[22px] ${index === 0 && 'opacity-50'}`} primary="#d72b0d" source={Close} />
              </Button>
            </div>
          )
        })
      )}
      {store.showPathInput(step) && (
        <TextField
          className="font-[JetBrains] text-[0.875rem]"
          error={step.error.path}
          onChange={(event) => store.onChangeMetadata(step, event.target.value)}
          outerClassName="ml-[120px]"
          placeholder="Enter the full path where the command should run"
          spellCheck={false}
          value={step.metadata.path ?? ''}
        />
      )}
    </div>
  )
})
