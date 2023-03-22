import { FetchedDataMovies } from "@/types"
import CardSlider from "./CardSlider"
import Card from "./Card"

interface PopularMoviesProps {
  movies: FetchedDataMovies
}

function PopularMovies({ movies }: PopularMoviesProps) {
  return (
    <>
      <h2>Popular Movies</h2>
      <CardSlider>
        {movies.results.map((movie) => (
          <Card
            key={movie.id}
            image={movie.backdrop_path}
            title={movie.title}
          />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularMovies
