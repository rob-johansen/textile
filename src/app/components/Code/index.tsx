type Props = {
  children: string
}

export const Code = ({ children }: Props) => {
  return (
    <span className="bg-slate-100 border border-gray-300 border-solid font-[JetBrains] px-[4px] py-[2px] rounded-[4px] text-[0.875rem]">
      {children}
    </span>
  )
}
