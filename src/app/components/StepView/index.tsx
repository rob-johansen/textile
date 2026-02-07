import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Action } from '@/types/Action'
import { Code } from '@/app/components/Code'
import { Input } from '@/types/Input'
import { StepViewStore } from '@/app/components/StepView/Store'
import { StoreContext } from '@/app/contexts/StoreContext'
import type { Step } from '@/types/Step'

type Props = {
  index: number
  step: Step
}

export const StepView = observer((props: Props) => {
  const { index, step } = props
  const root = useContext(StoreContext)
  const [store] = useState(() => new StepViewStore(root))

  return (
    <div className="flex flex-col w-fit">
      <div className="flex gap-x-[8px] items-start">
        <div className="flex gap-x-[8px] items-center">
          <div className="flex gap-x-[8px] items-start">
            <div className="bg-gradient-to-br flex font-bold from-[#4568dc] from-[-0.27%] items-center justify-center min-w-[32px] rounded-full size-[32px] text-white to-[#b06ab3] to-[134.14%]">
              {index + 1}
            </div>
            {step.action === Action.START ? (
              <>
                <span className="relative top-[4px]">
                  Start with{' '}
                  {step.input === Input.CLIPBOARD_RUNTIME && 'the text on my clipboard when I run this textile'}
                  {step.input === Input.COMMAND_RUNTIME && (
                    <>the output of <Code>{store.getCommand(step)}</Code> (in the <Code>{store.getPath(step)}</Code> directory) when I run this textile</>
                  )}
                  {step.input === Input.TEXT_NOW && <Code>{step.value}</Code>}.
                </span>
              </>
            ) : (
              <span className="relative top-[4px]">
                Then
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
