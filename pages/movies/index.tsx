import axios, { all } from "axios"
import { FetchedDataMovies, GenresTypes } from "@/types"
import Results from "@/components/Results"
import { useEffect, useRef, useState } from "react"
import Filters from "@/components/Filters"

interface MoviesPageProps {
  movies: FetchedDataMovies
  genres: GenresTypes
}
//todo promise.all
function MoviesPage({ movies, genres }: MoviesPageProps) {
  const [filters, setFilters] = useState<string[]>([])
  const [page, setPage] = useState(2)
  const [allMovies, setAllMovies] = useState(movies.results)
  const [filteredMovies, setFilteredMovies] = useState(allMovies)

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
    console.log(page)
    const moviesRes = await axios.get(`/api/movies?page=${page}`)
    const movies = await moviesRes.data
    console.log(movies.results)
    setAllMovies((prevMovies) => [...prevMovies, ...movies.results])
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    if (!filters.length) {
      setFilteredMovies(allMovies)
    } else {
      setFilteredMovies(() => {
        const updatedMovies = allMovies.filter((movie) =>
          filters.every((genreId) =>
            movie?.genre_ids?.map((id) => id.toString()).includes(genreId)
          )
        )
        return updatedMovies
      })
    }
  }, [filters, allMovies])

  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> MOVIES</span>:
      </p>
      <button onClick={fetchMoreData}>fetch</button>
      <Filters addFilter={addFilter} filters={filters} genres={genres} />
      <Results data={filteredMovies} />
    </>
  )
}

export default MoviesPage

export async function getStaticProps() {
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
    revalidate: 21600,
  }
}
