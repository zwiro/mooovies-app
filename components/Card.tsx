import { Movie } from "@/types"
import Image from "next/image"

interface CardProps {
  image: string
  title: string
}

function Card({ image, title }: CardProps) {
  return (
    <div className="group relative h-48 w-64 cursor-pointer snap-center rounded-xl bg-gradient-to-b from-zinc-700/10 to-zinc-900/90">
      <Image
        src={`https://image.tmdb.org/t/p/w500${image}`}
        alt="Poster"
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
