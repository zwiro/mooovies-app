interface SectionHeaderProps {
  title: string
}

function SectionHeader({ title }: SectionHeaderProps) {
  const [firstWord, secondWord] = title.split(" ")
  return (
    <h2 className="pb-1 pt-4 text-lg font-bold">
      {firstWord} <span className="text-red-700">{secondWord}</span>
    </h2>
  )
}

export default SectionHeader
