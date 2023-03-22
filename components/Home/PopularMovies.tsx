import { FetchedDataMovies } from "@/types"
import CardSlider from "../CardSlider"
import Card from "../Card"
import SectionHeader from "./SectionHeader"

interface PopularMoviesProps {
  movies: FetchedDataMovies
}

function PopularMovies({ movies }: PopularMoviesProps) {
  return (
    <>
      <SectionHeader title="Popular Movies" />
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
