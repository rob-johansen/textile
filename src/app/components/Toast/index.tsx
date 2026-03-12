import { twMerge } from 'tailwind-merge'
import toast, { Toaster } from 'react-hot-toast'
import type React from 'react'
import type { Toast as ToastType } from 'react-hot-toast'

import { Icon, CircleCheck, CircleClose, CircleInfo } from '@/app/components/Icon'

type Props = {
  duration?: number
  message: string
  type: 'error' | 'success' | 'info'
}

export const Toast = (): React.JSX.Element => (
  <Toaster containerStyle={{ top: '48px' }}/>
);

export const showToast = ({
  duration = 5000,
  message,
  type,
}: Props): void => {
  const error = type === 'error';
  const info = type === 'info';

  toast.custom(
    (instance: ToastType) => (
      <div
        className={twMerge(
          'bg-[#e6f1e9] border border-[#258750] flex gap-[10px] h-[50px] items-center px-[24px] rounded-full shadow-[0_8px_12px_rgba(100,100,100,0.16)] w-fit',
          error && 'bg-[#fbe5e3] border-[#d72b0d]',
          info && 'bg-blue-100 border-blue-500',
          !instance.visible && 'hidden'
        )}
      >
        <Icon source={error ? CircleClose : info ? CircleInfo : CircleCheck} />
        <span className={twMerge(
          'font-bold text-[#258750]',
          error && 'text-[#d72b0d]',
          info && 'text-blue-500'
        )}>
          {message}
        </span>
      </div>
    ),
    {duration}
  );
}
