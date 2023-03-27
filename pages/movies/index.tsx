import axios from "axios"
import { FetchedDataMovies } from "@/types"
import Results from "@/components/Results"

interface MoviesPageProps {
  movies: FetchedDataMovies
}

function MoviesPage({ movies }: MoviesPageProps) {
  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> MOVIES</span>:
      </p>
      <Results data={movies.results} />
    </>
  )
}

export default MoviesPage

export async function getServerSideProps() {
  const moviesRes = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  )
  const movies = await moviesRes?.data
  return {
    props: {
      movies,
    },
  }
}
