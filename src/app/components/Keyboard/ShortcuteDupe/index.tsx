import { useState } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, Warning } from '@/app/components/Icon'
import { Modal } from '@/app/components/Modal'
import { ShortcutText } from '@/app/components/Keyboard/ShortcutText'
import type { Textile } from '@/types/Textile'

type Props = {
  onCancel: () => void
  onRemove: () => Promise<void>
  textile: Textile
}

export const ShortcutDupe = ({ onCancel, onRemove, textile }: Props) => {
  const [first] = useState(textile.keyboard?.first)
  const [loading, setLoading] = useState(false)
  const [second] = useState(textile.keyboard?.second)

  return (
    <Modal
      className="[&>div:first-child]:ml-[38px]"
      title="Shortcut Conflict"
    >
      <Icon className="absolute h-[28px] top-[20px]" source={Warning} />
      <div className="flex gap-x-[16px] items-start">
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
          This shortcut conflicts with the <span className="font-bold">{textile.name}</span> textile{' '}
          (<ShortcutText className="inline" first={first!} second={second}/><span className={second ? 'ml-[2px]' : 'ml-[-11px]'}>)</span>.{' '}
          Do you want to remove the shortcut from that textile?
        </div>
      </div>
      <div className="flex gap-x-[16px] items-center justify-end mt-[24px]">
        <Button
          disabled={loading}
          onClick={onCancel}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true)
            onRemove()
          }}
        >
          Remove
        </Button>
      </div>
    </Modal>
  )
}
