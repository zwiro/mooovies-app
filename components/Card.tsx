import Image, { StaticImageData } from "next/image"
import posterPlaceholder from "@/public/poster_placeholder.png"
import { useState } from "react"

interface CardProps {
  image: string
  title: string
}

function Card({ image, title }: CardProps) {
  const [displayedPoster, setDisplayedPoster] = useState<
    string | StaticImageData
  >(`https://image.tmdb.org/t/p/w500${image}`)
  return (
    <div className="group relative h-48 w-64 cursor-pointer snap-center rounded-xl bg-gradient-to-b from-zinc-700/10 to-zinc-900/90">
      <Image
        src={displayedPoster}
        onError={() => setDisplayedPoster(posterPlaceholder)}
        alt={`${title} poster`}
        fill
        className="relative -z-10 rounded-xl object-cover transition-all group-hover:brightness-125"
      />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center tracking-wider ">
        {title}
      </p>
    </div>
  )
}

export default Card
