import axios from "axios"
import Card from "@/components/Card"
import { isMovies, isPeople, Movie, Person, Show } from "@/types"
import { GetServerSidePropsContext } from "next"
import { AnimatePresence } from "framer-motion"
import CardDetails from "@/components/CardDetails"
import { useRouter } from "next/router"
import useCard from "@/hooks/useCard"
import { usePageLoading } from "@/hooks/usePageLoading"

interface SearchPageProps {
  searchResult: { results: (Movie | Show | Person)[] }
}

function SearchPage({ searchResult }: SearchPageProps) {
  const { openedCardId, toggleCard } = useCard()
  const router = useRouter()
  const { isPageLoading } = usePageLoading()

  return (
    <>
      <p className="pb-4 text-center">
        Search results for{" "}
        <span className="font-bold text-red-700">{router.query.slug}</span>:
      </p>
      <div className="grid grid-cols-fluid place-items-center gap-4">
        {searchResult.results.map((result) => (
          <Card
            key={result.id}
            id={result.id}
            image={
              isPeople(result) ? result.profile_path : result.backdrop_path
            }
            title={isMovies(result) ? result.title : result.name}
            toggleCard={toggleCard}
          />
        ))}
      </div>
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
    </>
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
