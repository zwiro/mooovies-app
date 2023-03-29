import Link from "next/link"

interface SectionHeaderProps {
  title: string
}

function SectionHeader({ title }: SectionHeaderProps) {
  const [firstWord, secondWord] = title.split(" ")

  const href = secondWord.toLowerCase()

  return (
    <h2 className="pb-1 text-lg font-bold">
      {firstWord}{" "}
      <Link href={href}>
        <span className="text-red-700 hover:underline">{secondWord}</span>
      </Link>
    </h2>
  )
}

export default SectionHeader
