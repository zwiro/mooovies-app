import { isMovies, isPeople, Movie, Person, ProvidersType, Show } from "@/types"
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Image, { StaticImageData } from "next/image"
import { useState, useEffect } from "react"
import posterPlaceholder from "@/public/poster_placeholder.png"
import { getGenreFromId } from "@/utils/getGenreFromId"
import { motion } from "framer-motion"
import Link from "next/link"
import axios from "axios"
import { useQuery } from "react-query"
import LoadingSpinner from "./LoadingSpinner"
import useMediaQuery from "@/hooks/useMediaQuery"

interface CardDetailsProps {
  card: Movie | Show | Person
  toggleCard: (id: number | null) => void
}

function CardDetails({ card, toggleCard }: CardDetailsProps) {
  const isSmScreen = useMediaQuery("(min-width: 640px)")
  const [isTextExpanded, setIsTextExpanded] = useState(false)
  const title = isMovies(card) ? card.title : card.name
  const image = isPeople(card) ? card.profile_path : card.backdrop_path
  const release = isMovies(card)
    ? card.release_date
    : !isPeople(card) && card.first_air_date

  const [displayedPoster, setDisplayedPoster] = useState<
    string | StaticImageData
  >(`https://image.tmdb.org/t/p/w500${image}`)

  const fetchActorsAndProviders = async () => {
    if (isPeople(card)) return
    const type = isMovies(card) ? "movie" : "tv"
    const [actorsRes, providersRes] = await Promise.all([
      axios.get(`/api/actors?id=${card.id}&type=${type}`),
      axios.get(`/api/providers?id=${card.id}&type=${type}`),
    ])
    return { actors: actorsRes.data, providers: providersRes.data }
  }

  const { isLoading, isError, data } = useQuery(
    ["actors", "providers", { id: card.id }],
    fetchActorsAndProviders
  )

  const providers =
    data?.providers.results.US?.flatrate || data?.providers.results.US?.buy
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  const item = {
    hidden: { scale: 0, height: "auto" },
    show: { scale: 1, height: "auto" },
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
      onClick={() => toggleCard(null)}
      className="fixed top-0 left-0 z-20 grid h-screen w-screen place-items-center bg-black/20 p-4 backdrop-blur"
    >
      <motion.div
        variants={item}
        onClick={(e) => e.stopPropagation()}
        className={`m-2 flex flex-col gap-4 rounded-xl bg-black/80 p-4 lg:p-8 xl:w-2/3 2xl:w-1/2  ${
          isPeople(card) && "sm:w-max"
        } `}
      >
        <div className="flex items-center">
          <h3 className="max-w-xs text-xl font-bold tracking-widest text-red-700">
            {title}
          </h3>
          <XMarkIcon
            onClick={() => toggleCard(null)}
            className="ml-auto h-8 w-8 cursor-pointer transition-all hover:rotate-90 hover:text-red-700"
          />
        </div>

        {!isPeople(card) && providers && (
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs">Available at</p>
            {providers.map((provider: ProvidersType) => (
              <Image
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={`${provider.provider_name} logo`}
                width={24}
                height={24}
                className="rounded-full lg:h-8 lg:w-8"
              />
            ))}
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 md:gap-8 lg:gap-12">
          <div className="flex flex-1 justify-center">
            <Image
              src={displayedPoster}
              onError={() => setDisplayedPoster(posterPlaceholder)}
              alt={`${title} poster`}
              width={360}
              height={isPeople(card) ? 540 : 200}
              className={`max-h-56 w-full rounded-xl object-cover ${
                isPeople(card) && "max-h-96 w-auto sm:max-h-[500px] sm:w-auto"
              } `}
            />
          </div>
          {!isPeople(card) && (
            <p
              onClick={() => setIsTextExpanded((prevExpanded) => !prevExpanded)}
              className={`white flex-1 cursor-pointer text-sm sm:text-base ${
                !isSmScreen &&
                (isTextExpanded ? "line-clamp-none" : "line-clamp-6")
              }`}
            >
              {card.overview}
            </p>
          )}
        </div>
        {!isPeople(card) ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm">Released {release}</span>
              <div className="flex items-center gap-1">
                <StarIcon className="h-4 w-4 text-red-700" />
                <span>{card.vote_average.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {isLoading && (
                  <div className="mx-auto">
                    <LoadingSpinner />
                  </div>
                )}
                {isError && <div>Error while loading actors</div>}
                {!isLoading &&
                  data?.actors.cast.slice(0, 5).map((actor: Person) => (
                    <Link key={actor.id} href={`/person/${actor.id}`}>
                      <div className="rounded border border-transparent bg-red-700 px-1 transition-colors hover:border-red-700 hover:bg-transparent">
                        {actor.name}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {card.genre_ids.map((id) => (
                <Link key={id} href={`/genre/${id}`}>
                  <div className="rounded border border-transparent bg-red-700 px-1 transition-colors hover:border-red-700 hover:bg-transparent">
                    {getGenreFromId(id)}
                  </div>
                </Link>
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
              <div>
                {card.known_for.map((item) => (
                  <div key={item.id} className="font-bold">
                    {isMovies(item) ? item.title : item.name}
                  </div>
                ))}
                <Link href={`/person/${card.id}`}>
                  <button className="my-1 rounded border border-transparent bg-red-700 px-1 transition-colors hover:border-red-700 hover:bg-transparent">
                    See more
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CardDetails
