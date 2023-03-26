import { isMovies, isPeople, Movie, Person, Show } from "@/types"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Image, { StaticImageData } from "next/image"
import { useState } from "react"
import posterPlaceholder from "@/public/poster_placeholder.png"
import { getGenreFromId } from "@/utils/getGenreFromId"
import { motion } from "framer-motion"

interface CardDetailsProps {
  card: Movie | Show | Person
  toggleCard: (id: number | null) => void
}

function CardDetails({ card, toggleCard }: CardDetailsProps) {
  const title = isMovies(card) ? card.title : card.name
  const image = isPeople(card) ? card.profile_path : card.backdrop_path
  const release = isMovies(card)
    ? card.release_date
    : !isPeople(card) && card.first_air_date

  const [displayedPoster, setDisplayedPoster] = useState<
    string | StaticImageData
  >(`https://image.tmdb.org/t/p/w500${image}`)

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  const item = {
    hidden: { scale: 0 },
    show: { scale: 1 },
  }

  const animation = {
    initial: "hidden",
    animate: "show",
    exit: "hidden",
  }

  return (
    <motion.div
      variants={container}
      {...animation}
      className="absolute inset-0 z-20 grid place-items-center bg-black/20 p-4 backdrop-blur"
    >
      <motion.div
        variants={item}
        className="m-2 flex flex-col gap-4 rounded-xl bg-black/80 p-4"
      >
        <div className="flex items-center">
          <h3 className="text-xl font-bold tracking-widest text-red-700">
            {title}
          </h3>
          <XMarkIcon
            onClick={() => toggleCard(null)}
            className="ml-auto h-8 w-8 cursor-pointer transition-all hover:rotate-90 hover:text-red-700"
          />
        </div>
        <Image
          src={displayedPoster}
          onError={() => setDisplayedPoster(posterPlaceholder)}
          alt={`${title} poster`}
          width={512}
          height={512}
          className="rounded-xl"
        />
        {!isPeople(card) ? (
          <>
            <p>{card.overview}</p>
            <span className="text-sm">Released {release}</span>
            <div className="flex gap-2">
              {card.genre_ids.map((id) => (
                <div key={id} className="rounded bg-red-700 px-1">
                  {getGenreFromId(id)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col text-sm">
              <div className="flex">
                <span>Known for:</span>
                <span className="ml-auto rounded bg-red-700 px-1 text-base">
                  {card.known_for_department}
                </span>
              </div>
              {card.known_for.map((item) => (
                <div key={item.id} className="font-bold">
                  {isMovies(item) ? item.title : item.name}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CardDetails
