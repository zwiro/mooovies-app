import axios from "axios"
import { Movie, Person, SearchedData, Show } from "@/types"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import Results from "@/components/Results"
import LoadingSpinner from "@/components/LoadingSpinner"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"

interface SearchPageProps {
  searchResult: SearchedData
}

function SearchPage({ searchResult }: SearchPageProps) {
  const router = useRouter()
  const query = router.query.slug?.toString()

  const { isLoading, isError, allData, isFetchingNextPage, ref } =
    useInfiniteScroll(searchResult.results, "search", { query: query })

  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        SEARCH RESULTS FOR{" "}
        <span className="font-bold uppercase text-red-700">{query}</span>:
      </p>
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      {allData.length ? (
        <Results data={allData} />
      ) : (
        <p className="text-center">No results found</p>
      )}
      {allData.length ? <div ref={ref} /> : ""}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
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
