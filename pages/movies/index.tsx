import axios from "axios"
import { FetchedDataMovies, GenresTypes } from "@/types"
import Results from "@/components/Results"
import { useState } from "react"
import Filters from "@/components/Filters"
import { useQuery } from "react-query"
import LoadingSpinner from "@/components/LoadingSpinner"

interface MoviesPageProps {
  movies: FetchedDataMovies
  genres: GenresTypes
}
function MoviesPage({ movies, genres }: MoviesPageProps) {
  const [filters, setFilters] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState(movies.results)

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

  const fetchMoreData = async () => {
    const moviesRes = await axios.get(
      `/api/movies?page=${page}&genres=${filters}`
    )
    const movies = await moviesRes.data
    setAllMovies(movies.results)
  }

  const { isLoading, isError } = useQuery(["movies", filters], fetchMoreData)

  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> MOVIES</span>:
      </p>
      <Filters addFilter={addFilter} filters={filters} genres={genres} />
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      <Results data={allMovies} />
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
