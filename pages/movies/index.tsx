import axios from "axios"
import { FetchedDataMovies, GenresTypes, SortOptions } from "@/types"
import Results from "@/components/Results"
import { useEffect, useRef, useState } from "react"
import Filters from "@/components/Filters"
import { useInfiniteQuery } from "react-query"
import LoadingSpinner from "@/components/LoadingSpinner"
import Sorting from "@/components/Sorting"
import { useInView } from "framer-motion"

interface MoviesPageProps {
  movies: FetchedDataMovies
  genres: GenresTypes
}

function MoviesPage({ movies, genres }: MoviesPageProps) {
  const [filters, setFilters] = useState<string[]>([])
  const [allMovies, setAllMovies] = useState(movies.results)
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.popularityDesc)

  const ref = useRef(null)
  const isInView = useInView(ref)

  const addFilter = (e: React.MouseEvent) => {
    const { id } = (e.target as HTMLButtonElement).dataset
    if (!id) return
    if (filters.includes(id)) {
      setFilters((prevFilters) => {
        const updatedFilters = prevFilters.filter((filter) => filter !== id)
        return updatedFilters
      })
    } else {
      setFilters((prevFilters) => [...prevFilters, id])
    }
  }

  const sort = (option: SortOptions) => {
    setSortBy(option)
  }

  const fetchMoreData = async (page: number) => {
    const moviesRes = await axios.get(
      `/api/movies?page=${page}&genres=${filters}&sort=${sortBy}`
    )
    const movies = await moviesRes.data
    if (page > 1) {
      setAllMovies((prevMovies) => [...prevMovies, ...movies.results])
    } else {
      setAllMovies(movies.results)
    }
  }

  const { isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", filters, sortBy],
      queryFn: ({ pageParam = 1 }) => fetchMoreData(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allMovies.length < 20 ? undefined : allPages.length + 1
        return nextPage
      },
    })

  useEffect(() => {
    fetchNextPage()
  }, [isInView, fetchNextPage])

  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> MOVIES</span>:
      </p>
      <div className="flex justify-between">
        <Filters addFilter={addFilter} filters={filters} genres={genres} />
        <Sorting sort={sort} sortBy={sortBy} />
      </div>
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      {allMovies.length ? (
        <Results data={allMovies} />
      ) : (
        <p className="text-center">No movies found with chosen genres</p>
      )}
      <div ref={ref} />
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

export default MoviesPage

export async function getStaticProps() {
  const [moviesRes, genresRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    ),
  ])

  const [movies, genres] = await Promise.all([moviesRes.data, genresRes.data])
  return {
    props: {
      movies,
      genres,
    },
    revalidate: 21600,
  }
}
