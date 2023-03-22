import { Movie } from "@/types"
import Image from "next/image"

interface CardProps {
  image: string
  title: string
}

function Card({ image, title }: CardProps) {
  return (
    <div className="relative h-max w-max rounded-xl bg-gradient-to-b from-zinc-700/10 to-zinc-900/90">
      <Image
        src={`https://image.tmdb.org/t/p/w500${image}`}
        alt="Poster"
        width={300}
        height={300}
        className="relative -z-10 rounded-xl"
      />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center tracking-wider ">
        {title}
      </p>
    </div>
  )
}

export default Card
