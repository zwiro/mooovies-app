import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import posterPlaceholder from "@/public/poster_placeholder.png"
import photoPlaceholder from "@/public/photo_placeholder.png"

interface CardProps {
  id: number
  image: string
  title: string
  toggleCard: (cardId: number) => void
  isCardSlider?: boolean
  isPeople?: boolean
}

function Card({
  id,
  image,
  title,
  toggleCard,
  isCardSlider,
  isPeople,
}: CardProps) {
  const [displayedPoster, setDisplayedPoster] = useState<
    string | StaticImageData
  >(`https://image.tmdb.org/t/p/w500${image}`)

  return (
    <div
      onClick={() => toggleCard(id)}
      className={`group relative cursor-pointer snap-center rounded-xl bg-gradient-to-b from-zinc-700/10 to-zinc-900/90 ${
        isCardSlider && "h-48 w-64"
      } `}
    >
      <Image
        src={displayedPoster}
        onError={() =>
          setDisplayedPoster(isPeople ? photoPlaceholder : posterPlaceholder)
        }
        alt={`${title} poster`}
        height={256}
        width={512}
        className={`relative -z-10 rounded-xl object-cover transition-all group-hover:brightness-125 ${
          isCardSlider && "h-full w-full"
        } `}
      />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center tracking-wider ">
        {title}
      </p>
    </div>
  )
}

export default Card
