import axios from "axios"
import { Movie, Person, Show } from "@/types"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import useCard from "@/hooks/useCard"
import Results from "@/components/Results"

interface SearchPageProps {
  searchResult: { results: (Movie | Show | Person)[] }
}

function SearchPage({ searchResult }: SearchPageProps) {
  const router = useRouter()

  return (
    <>
      <p className="pb-4 text-center">
        Search results for{" "}
        <span className="font-bold text-red-700">{router.query.slug}</span>:
      </p>
      <Results data={searchResult} />
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
