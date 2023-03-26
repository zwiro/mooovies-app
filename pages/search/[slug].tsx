import axios from "axios"
import Card from "@/components/Card"
import { isMovies, isPeople, Movie, Person, Show } from "@/types"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import { AnimatePresence } from "framer-motion"
import CardDetails from "@/components/CardDetails"
import { useRouter } from "next/router"

interface SearchPageProps {
  searchResult: { results: (Movie | Show | Person)[] }
}

function SearchPage({ searchResult }: SearchPageProps) {
  const [openedCardId, setOpenedCardId] = useState<number | null>(null) // TODO: CHANGE TO CUSTOM HOOK

  const toggleCard = (cardId: number | null) => {
    setOpenedCardId(cardId)
  }

  const router = useRouter()

  return (
    <div className="grid place-items-center gap-4">
      <p>
        Search results for{" "}
        <span className="font-bold">{router.query.slug}</span>:
      </p>
      {searchResult.results.map((result) => (
        <Card
          key={result.id}
          id={result.id}
          image={isPeople(result) ? result.profile_path : result.backdrop_path}
          title={isMovies(result) ? result.title : result.name}
          toggleCard={toggleCard}
        />
      ))}
      <AnimatePresence>
        {openedCardId && (
          <CardDetails
            card={
              searchResult.results.find(
                (data: Movie | Show | Person) => data.id === openedCardId
              )!
            }
            toggleCard={toggleCard}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const searchResultRes =
    context.params &&
    (await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${context.params.slug}&page=1&include_adult=false`
    ))
  const searchResult = await searchResultRes?.data
  return {
    props: {
      searchResult,
    },
  }
}
