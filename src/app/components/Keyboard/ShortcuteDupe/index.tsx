import { useState } from 'react'

import { Button } from '@/app/components/Button'
import { Modal } from '@/app/components/Modal'
import { ShortcutText } from '@/app/components/Keyboard/ShortcutText'
import type { Textile } from '@/types/Textile'

type Props = {
  onCancel: () => void
  onRemove: () => Promise<void>
  textile: Textile
}

export const ShortcutDupe = ({ onCancel, onRemove, textile }: Props) => {
  const [loading, setLoading] = useState(false)

  /*
    TODO: When you click the "Remove" button, it changes to a spinner and this modal stays open; however, `textile.keyboard`
          is now `undefined` ... so you can't show the <ShortcutText> component anymore. Come up with something...
   */

  return (
    <Modal title="Shortcut Conflict">
      <div className="flex items-center">
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
          <ShortcutText className="inline" first={textile.keyboard?.first!} second={textile.keyboard?.second} />{' '}
          <span className={textile.keyboard?.second ? 'ml-[2px]' : 'ml-[-8px]'}>is already assigned to the <span className="font-bold">{textile.name}</span> textile. Do you want to remove it from that textile?</span>
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
