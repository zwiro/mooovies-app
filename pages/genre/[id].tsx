import { useEffect, useRef, useState } from "react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import axios from "axios"
import { useInfiniteQuery } from "react-query"
import { useInView } from "framer-motion"
import { Movie, Show } from "@/types"
import { getGenreFromId } from "@/utils/getGenreFromId"
import Results from "@/components/Results"
import LoadingSpinner from "@/components/LoadingSpinner"
import Sorting from "@/components/Sorting"
import useSort from "@/hooks/useSort"

interface GenrePageProps {
  movies: { results: Movie[] }
  shows: { results: Show[] }
}

function GenrePage({ movies, shows }: GenrePageProps) {
  const { sortBy, sort } = useSort()

  const router = useRouter()

  const id = router.query.id

  const [allResults, setAllResults] = useState(
    [...movies.results, ...shows.results].sort(
      (a: Movie | Show, b: Movie | Show) => b.popularity - a.popularity
    )
  )

  const ref = useRef(null)

  const isInView = useInView(ref)

  const fetchMoreData = async (page: number) => {
    const dataRes = await axios.get(
      `/api/combined?page=${page}&genre=${id}&sort=${sortBy}`
    )
    const data = await dataRes.data
    if (page > 1) {
      setAllResults((prevResults) => [...prevResults, ...data])
    } else {
      setAllResults(data)
    }
  }

  const { isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["combined", { sortBy }],
      queryFn: ({ pageParam = 1 }) => fetchMoreData(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          allResults.length < 20 ? undefined : allPages.length + 1
        return nextPage
      },
    })

  useEffect(() => {
    fetchNextPage()
  }, [isInView, fetchNextPage])

  useEffect(() => {
    if (!getGenreFromId(Number(router.query.id))) router.push("/")
  }, [router])

  return (
    <>
      <Head>
        <title>Mooovies | {getGenreFromId(Number(router.query.id))}</title>
      </Head>
      <p className="pb-4 text-center tracking-widest lg:text-2xl">
        <span className="font-bold uppercase text-red-700">
          {getGenreFromId(Number(router.query.id))}{" "}
        </span>
        MOVIES AND SHOWS:
      </p>
      <div className="flex justify-end">
        <Sorting sort={sort} sortBy={sortBy} />
      </div>
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      {allResults.length ? (
        <Results data={allResults} />
      ) : (
        <p className="text-center">No results found</p>
      )}
      {allResults.length ? <div ref={ref} /> : ""}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

export default GenrePage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [moviesRes, showsRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${context.params?.id}`
    ),
    axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&page=1&with_genres=${context.params?.id}`
    ),
  ])
  const [movies, shows] = await Promise.all([moviesRes.data, showsRes.data])
  return {
    props: {
      movies,
      shows,
    },
  }
}
