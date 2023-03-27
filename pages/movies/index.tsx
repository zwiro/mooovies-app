import axios from "axios"
import { FetchedDataMovies, GenresTypes } from "@/types"
import Results from "@/components/Results"
import { useEffect, useState } from "react"
import Filters from "@/components/Filters"

interface MoviesPageProps {
  movies: FetchedDataMovies
  genres: GenresTypes
}
//todo promise.all
function MoviesPage({ movies, genres }: MoviesPageProps) {
  const [filters, setFilters] = useState<string[]>([])
  const [filteredMovies, setFilteredMovies] = useState(movies.results)

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

  useEffect(() => {
    if (!filters.length) {
      setFilteredMovies(movies.results)
    } else {
      setFilteredMovies(() => {
        const updatedMovies = movies.results.filter((movie) =>
          filters.every((genreId) =>
            movie.genre_ids.map((id) => id.toString()).includes(genreId)
          )
        )
        return updatedMovies
      })
    }
  }, [filters, movies])

  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> MOVIES</span>:
      </p>
      <Filters addFilter={addFilter} filters={filters} genres={genres} />
      <Results data={filteredMovies} />
    </>
  )
}

export default MoviesPage

export async function getServerSideProps() {
  const moviesRes = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  )
  const genresRes = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  )
  const movies = await moviesRes?.data
  const genres = await genresRes.data
  return {
    props: {
      movies,
      genres,
    },
  }
}
