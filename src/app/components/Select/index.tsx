import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

import { Icon, Checkmark, ChevronDown } from '@/app/components/Icon'
import { SelectStore } from './Store'
import { TextField } from '@/app/components/TextField'
import type { Option } from './Option'
import type { Props as TextFieldProps } from '@/app/components/TextField'

export type Props = TextFieldProps & {
  onClickOption: (option: Option) => void
  options: Option[]
  value: string
}

export const Select = observer(({
  className,
  onClickOption,
  options,
  outerClassName,
  ...props
}: Props) => {
  const [store] = useState(() => new SelectStore(options, props.value))

  const { context, floatingStyles, refs } = useFloating({
    middleware: [offset(8), flip()],
    onOpenChange: store.setOpen,
    open: store.state.open,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate
  })

  const { getFloatingProps, getItemProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context, { ancestorScroll: true }),
    useRole(context, { role: 'listbox' }),
  ])

  return (
    <div className={twMerge('flex flex-col relative', outerClassName)}>
      <TextField
        {...getReferenceProps()}
        {...props}
        className={twMerge('cursor-default pr-[32px] field-sizing-content focus:border-slate-400 focus:shadow-[0_0_4px_rgba(148,163,184,0.3)] selection:text-white text-[1rem]', className)}
        readOnly
        ref={refs.setReference}
        value={store.state.options.filter((option: Option): boolean | undefined => option.selected)?.[0]?.name ?? ''}
      />
      <Icon
        className={twMerge('absolute cursor-pointer pointer-events-none right-[10px] top-[8px] transition w-[18px]',
          props.disabled && 'cursor-not-allowed',
          store.state.open && 'rotate-180'
        )}
        source={ChevronDown}
      />
      {store.state.open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              {...getFloatingProps()}
              className="bg-neutral-50/[0.75] border-[1px] border-neutral-200 m-0 max-h-[260px] overflow-y-auto rounded shadow-md z-50"
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                minWidth: refs.reference.current?.getBoundingClientRect().width
              }}
            >
              <div className="flex flex-col rounded">
                {store.state.options.map((option: Option) => {
                  const { icon, name, selected, value } = option

                  return (
                    <button
                      className={twMerge('flex hover:bg-blue-100/[0.375] items-center justify-between min-h-[44px] outline-none text-left transition',
                        selected && 'bg-blue-100/[0.625] hover:bg-blue-100/[0.625] pr-[8px]',
                        selected && icon && 'pr-[28px]'
                      )}
                      key={value}
                      tabIndex={0}
                      {...getItemProps({
                        onClick() {
                          store.onClickOption(option)
                          onClickOption(option)
                        },
                      })}
                    >
                      {icon && (
                        <Icon className="ml-[12px] size-[20px]" source={icon} />
                      )}
                      <span
                        className={twMerge('px-[1rem] py-[0.375rem] w-full whitespace-nowrap transition',
                          icon && 'pl-[10px]',
                          selected && 'font-bold pr-0 text-neutral-800'
                        )}
                      >
                        {name}
                      </span>
                      {selected && (
                        <Icon
                          className="h-[22px] relative right-[-12px] top-[-1px] w-[22px]"
                          primary="#3b82f6"
                          source={Checkmark}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
})
