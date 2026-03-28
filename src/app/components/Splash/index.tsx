import { Icon, Textile } from '@/app/components/Icon'

export const Splash = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full">
      <Icon className="animate-spinner size-[52px]" primary="#3b82f6" source={Textile} />
    </div>
  )
}
