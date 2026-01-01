import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { twMerge } from 'tailwind-merge'
import type React from 'react'

type Props = Omit<React.HTMLProps<HTMLDivElement>, 'title'> & {
  onEscape?: (open: boolean) => void
  title: string
}

export const Modal = ({ children, className, onEscape, title }: Props) => {
  const { context, refs } = useFloating({ onOpenChange: onEscape, open: true })
  const { setFloating, setReference } = refs

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context, { escapeKey: !!onEscape }),
    useRole(context)
  ])

  return (
    <>
      <div
        className="cursor-pointer w-fit"
        ref={setReference}
        {...getReferenceProps()}
      />
      <FloatingPortal>
        <FloatingOverlay
          className="grid place-items-center bg-[#3c3c3c]/[0.25] z-40"
          lockScroll
        >
          <FloatingFocusManager context={context}>
            <div
              className={twMerge('bg-white max-w-[500px] min-w-[350px] my-[32px] relative rounded-[8px] shadow-md', className)}
              ref={setFloating}
              {...getFloatingProps()}
            >
              <div className="flex items-center h-[60px] justify-between px-[16px] pt-[8px] rounded-tl-[8px] rounded-tr-[8px]">
                <h3 className="flex font-bold items-center overflow-hidden text-[1.125rem] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  {title}
                </h3>
              </div>
              <div className="flex flex-col max-h-[calc(100vh-212px)] pb-[16px] pt-[8px] px-[16px]">
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    </>
  )
}
