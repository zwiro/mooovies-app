import { FetchedDataShows } from "@/types"
import CardSlider from "./CardSlider"
import Card from "./Card"

interface PopularShowsProps {
  shows: FetchedDataShows
}

function PopularShows({ shows }: PopularShowsProps) {
  return (
    <>
      <h2>Popular Shows</h2>
      <CardSlider>
        {shows.results.map((show) => (
          <Card key={show.id} image={show.backdrop_path} title={show.name} />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularShows
