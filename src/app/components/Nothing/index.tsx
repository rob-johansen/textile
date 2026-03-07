import { Icon, Textile } from '@/app/components/Icon'

type Props = {
  hasTextiles: boolean
}

export const Nothing = ({ hasTextiles }: Props) => {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full">
      <Icon className="size-[52px]" primary="#3b82f680" source={Textile} />
      <div className="mt-[16px] text-center">
        {hasTextiles ? (
          <>
            <div className="text-[1.5rem]">
              Choose a textile
            </div>
            <span className="text-slate-600">
              or click “New Textile”
            </span>
          </>
        ) : (
          <>
            <div className="max-w-[220px] text-[1.375rem]">
              Click &quot;New Textile&quot; to get started
            </div>
          </>
        )}
      </div>
    </div>
  )
}
